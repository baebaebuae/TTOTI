package kr.co.ttoti.backend.domain.room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.notification.repository.NotificationRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import kr.co.ttoti.backend.domain.room.dto.RoomMemberPendingDto;
import kr.co.ttoti.backend.domain.room.dto.RoomSummaryDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class RoomListGetServiceImpl implements RoomListGetService {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public List<RoomSummaryDto> getRoomList(Integer memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        return roomMemberRepository.findByMemberAndRoomMemberIsDeletedFalse(member).stream()
                .filter(roomMember -> !roomMember.getRoom().getRoomIsDeleted() &&
                        !roomMember.getRoom().getRoomIsFinished())
                .map(roomMember -> {
                    Room room = roomMember.getRoom();

                    return new RoomSummaryDto(roomMember,
                            memberRepository.findById(room.getRoomHostMemberId()).orElseThrow(() -> new CustomException(ErrorCode.ROOM_HOST_MEMBER_NOT_FOUND)),
                            roomMemberRepository.countByRoomAndRoomMemberIsDeletedFalse(room),
                            notificationRepository.existsByRoomIdAndMemberIdAndNotificationIsRead(room.getRoomId(),
                                    memberId,
                                    false),
                            room.getRoomParticipants());
                })
                .toList();
    }

    @Override
    public List<RoomMemberPendingDto> getRoomMemberList(Integer roomId) {
        Room room = roomRepository.findByRoomIdAndRoomIsDeletedFalse(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        return roomMemberRepository.findByRoomAndRoomMemberIsDeletedFalse(room)
                .stream()
                .map(roomMember -> new RoomMemberPendingDto())
                .toList();
    }

    @Override
    public Integer getCurrentRoomParticipants(Integer roomId) {
        Room room = roomRepository.findByRoomIdAndRoomIsDeletedFalse(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        return roomMemberRepository.countByRoomAndRoomMemberIsDeletedFalse(room);
    }
}
