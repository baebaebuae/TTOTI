package kr.co.ttoti.backend.domain.guess.service;

import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;

public interface GuessCreateService {

	void insertGuess(RoomMember member, Room room, Integer tittoId);
}
