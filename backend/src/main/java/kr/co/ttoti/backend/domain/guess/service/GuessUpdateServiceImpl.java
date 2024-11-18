package kr.co.ttoti.backend.domain.guess.service;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.guess.entity.Guess;
import kr.co.ttoti.backend.domain.guess.repository.GuessRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GuessUpdateServiceImpl implements GuessUpdateService {

    private final Validator validator;
    private final RoomMemberRepository roomMemberRepository;
    private final GuessRepository guessRepository;
    private final TtotiRepository ttotiRepository;

    @Override
    public void updateGuess(Integer memberId, Integer roomId, Integer guessRoomMemberId) {

        // 자가 검증
        Member member = validator.validateMember(memberId);
        Room room = validator.validateRoom(roomId);
        Ttoti ttoti = ttotiRepository.findByRoomAndMember(room, member).orElseThrow(() -> new CustomException(ErrorCode.TTOTI_NOT_FOUND));

        // 추측 멤버 검증
        RoomMember guessRoomMember = roomMemberRepository.findByRoomMemberId(guessRoomMemberId).orElseThrow(() -> new CustomException(ErrorCode.ROOM_MEMBER_NOT_FOUND));
        if (!guessRoomMember.getRoom().equals(room)) throw new CustomException(ErrorCode.ROOM_MEMBER_NOT_IN_ROOM);

        Member guessMember = validator.validateMember(guessRoomMember.getMember().getMemberId());
        Guess guess = guessRepository.findByMemberIdAndRoomIdAndGuessDate(member.getMemberId(), room.getRoomId(), LocalDate.now()).orElseThrow(() -> new CustomException(ErrorCode.GUESS_NOT_EXISTS));
        Member myManitto = validator.validateTtoti(guess.getTittoId()).getMember();
        if(guess.getGuessIsAnswered()) throw new CustomException(ErrorCode.GUESS_ALREADY_ANSWERED);

        guess.updateAnswer(myManitto, guessMember);

        guessRepository.save(guess);
    }
}
