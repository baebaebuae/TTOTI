package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.domain.room.dto.RoomUpdateRequest;

public interface RoomUpdateService {

	void updateRoom(Integer memberId, Integer roomId, RoomUpdateRequest roomUpdateRequest);
}
