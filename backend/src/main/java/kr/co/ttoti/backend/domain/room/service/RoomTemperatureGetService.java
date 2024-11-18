package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.domain.room.dto.RoomTemperatureListGetDto;

public interface RoomTemperatureGetService {

	RoomTemperatureListGetDto getRoomTemperatureList(Integer memberId, Integer roomId);
}
