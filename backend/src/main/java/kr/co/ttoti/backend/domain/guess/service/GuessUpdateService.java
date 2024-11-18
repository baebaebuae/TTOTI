package kr.co.ttoti.backend.domain.guess.service;

public interface GuessUpdateService {

    void updateGuess(Integer memberId, Integer roomId, Integer guessRoomMemberId);
}
