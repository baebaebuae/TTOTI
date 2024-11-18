package kr.co.ttoti.backend.domain.room.service;

import java.time.LocalDate;
import java.util.List;

import kr.co.ttoti.backend.domain.guess.dto.GuessInfoDto;
import kr.co.ttoti.backend.domain.guess.entity.Guess;
import kr.co.ttoti.backend.domain.guess.repository.GuessRepository;
import kr.co.ttoti.backend.domain.room.dto.*;
import kr.co.ttoti.backend.domain.ttoti.dto.MyManittoDto;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import kr.co.ttoti.backend.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomGetServiceImpl implements RoomGetService {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final RedisUtil redisUtil;
    private final Validator validator;
    private final TtotiRepository ttotiRepository;
    private final GuessRepository guessRepository;

    private RoomMemberListPendingDto getRoomMembers(Room room) {
        List<RoomMember> roomMembers = roomMemberRepository.findByRoomAndRoomMemberIsDeletedFalse(room);

        int currentParticipants = roomMembers.size();
        int totalParticipants = room.getRoomParticipants();
        List<RoomMemberPendingDto> roomMemberDtos = roomMembers.stream().map(roomMember -> {
            Member member = roomMember.getMember();
            return RoomMemberPendingDto.builder()
                    .name(member.getMemberName())
                    .profileImageUrl(member.getMemberProfileImageUrl())
                    .isReady(roomMember.getRoomMemberIsReady())
                    .build();
        }).toList();

        return RoomMemberListPendingDto.builder()
                .currentParticipants(currentParticipants)
                .totalParticipants(totalParticipants)
                .roomMemberList(roomMemberDtos)
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean getRoomStatus(Integer memberId, Integer roomId) {
        Member member = validator.validateMember(memberId);

        Room room = validator.validateRoom(roomId);

        RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);

        return room.getRoomIsStarted();
    }

    @Transactional(readOnly = true)
    @Override
    public RoomPendingDto getRoomIfPending(Integer memberId, Integer roomId) {
        Member member = validator.validateMember(memberId);

        Room room = roomRepository.findByRoomIdAndRoomIsStartedFalse(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);

        if (room.getRoomIsStarted())
            throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);

        Member hostMember = validator.validateMember(room.getRoomHostMemberId());

        return RoomPendingDto.builder()
                .hostName(hostMember.getMemberName())
                .roomName(room.getRoomName())
                .roomCode(room.getRoomCode())
                .roomMemberInfo(getRoomMembers(room))
                .profileImageUrl(roomMember.getRoomMemberIsReady() ? roomMember.getAnimal().getAnimalImageUrl() :
                        member.getMemberProfileImageUrl())
                .isReady(roomMember.getRoomMemberIsReady())
                .animalProfileImageUrl(
                        roomMember.getRoomMemberIsReady() ? roomMember.getAnimal().getAnimalImageUrl() : null)
                .build();
    }

    @Override
    public RoomMemberListPendingDto getRoomMemberListIfPending(Integer memberId, Integer roomId) {
        Member member = validator.validateMember(memberId);

        Room room = roomRepository.findByRoomIdAndRoomIsStartedFalse(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);

        return getRoomMembers(room);
    }

    @Override
    public String getRoomLink(Integer memberId, Integer roomId) {
        Member member = validator.validateMember(memberId);

        Room room = roomRepository.findByRoomIdAndRoomIsStartedFalse(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);

        String roomLink = null;
        if ((roomLink = redisUtil.getRoomLink(room)) == null) {
            redisUtil.setRoomLink(room);
            roomLink = redisUtil.getRoomLink(room);
        }

        if (roomLink == null)
            throw new CustomException(ErrorCode.ROOM_LINK_NOT_CREATED);

        return roomLink;
    }

    @Override
    public RoomInProgressDto getRoomIfInProgress(Integer memberId, Integer roomId) {

        Member member = validator.validateMember(memberId);
        Room room = validator.validateRoom(roomId);
        if (!room.getRoomIsStarted()) {
            throw new CustomException(ErrorCode.ROOM_IS_PENDING);
        }

        validator.validateMemberRoomAuthorization(room, member);

        Member hostMember = validator.validateMember(room.getRoomHostMemberId());

        Ttoti ttoti = ttotiRepository.findByRoomAndMember(room, member).orElseThrow(
                () -> new CustomException(ErrorCode.TTOTI_NOT_FOUND)
        );
        Member myManiti = validator.validateMember(ttoti.getManitiId());
        Ttoti titto = validator.validateTtoti(ttoti.getTittoId());

        Boolean canGuess = room.getRoomMidDate().equals(LocalDate.now())
                || room.getRoomFinishDate().minusDays(1).equals(LocalDate.now());
        if(canGuess) {
            Guess guess = guessRepository.findByMemberIdAndRoomIdAndGuessDate(member.getMemberId(), room.getRoomId(), LocalDate.now()).orElseThrow(() -> new CustomException(ErrorCode.GUESS_NOT_INSERTED));
            if (guess.getGuessIsAnswered()) canGuess = Boolean.FALSE;
        }

        GuessInfoDto guessInfoDto = !canGuess ? null : GuessInfoDto.builder().myManitto(MyManittoDto.builder()
                        .manittoProfileImageUrl(titto.getAnimal().getAnimalImageUrl())
                        .manittoNickname(titto.getTtotiAnimalName()).build()
                )
                .roomMemberList(roomMemberRepository.findByRoom(room)
                        .stream()
                        .filter(roomMember -> !roomMember.getMember().equals(member) && !roomMember.getMember().equals(myManiti))
                        .map(roomMember -> {
                            Member tmpMember = roomMember.getMember();
                            return RoomMemberInProgressDto.builder()
                                    .roomMemberId(roomMember.getRoomMemberId())
                                    .roomMemberName(tmpMember.getMemberName())
                                    .roomMemberProfileImageUrl(tmpMember.getMemberProfileImageUrl())
                                    .build();
                        }).toList())
                .build();

        return RoomInProgressDto.builder()
                .roomHostMemberName(hostMember.getMemberName())
                .roomName(room.getRoomName())
                .ttotiMatchInfo(
                        TtotiMatchDto.builder()
                                .myTtotiId(ttoti.getTtotiId())
                                .myTittoId(titto.getTtotiId())
                                .myManittoAnimalName(titto.getTtotiAnimalName())
                                .myManittoAnimalImageUrl(titto.getAnimal().getAnimalImageUrl())
                                .myName(member.getMemberName())
                                .myProfileImageUrl(member.getMemberProfileImageUrl())
                                .myAnimalName(ttoti.getTtotiAnimalName())
                                .myAnimalImageUrl(ttoti.getAnimal().getAnimalImageUrl())
                                .myManitiMemberName(myManiti.getMemberName())
                                .myManitiProfileImageUrl(myManiti.getMemberProfileImageUrl())
                                .build()
                )
                .canGuess(canGuess)
                .guessInfoDto(guessInfoDto)
                .build();
    }

}
