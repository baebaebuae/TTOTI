package kr.co.ttoti.backend.domain.guess.service;

import java.time.LocalDate;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.guess.entity.Guess;
import kr.co.ttoti.backend.domain.guess.repository.GuessRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GuessCreateServiceImpl implements GuessCreateService {

    private final GuessRepository guessRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    @Transactional
    @Override
    public void insertGuess(RoomMember member, Room room, Integer tittoId) {
        if(!room.getRoomMidDate().equals(room.getRoomFinishDate().minusDays(1))) {
            guessRepository.save(Guess.builder()
                    .memberId(member.getMember().getMemberId())
                    .roomId(room.getRoomId())
                    .tittoId(tittoId)
                    .guessIsCorrect(false)
                    .guessIsFinal(false)
                    .guessDate(room.getRoomMidDate())
                    .guessIsAnswered(false)
                    .build());
        }

        guessRepository.save(Guess.builder()
                .memberId(member.getMember().getMemberId())
                .roomId(room.getRoomId())
                .tittoId(tittoId)
                .guessIsCorrect(false)
                .guessIsFinal(true)
                .guessDate(room.getRoomFinishDate().minusDays(1))
                .guessIsAnswered(false)
                .build());
    }
}
