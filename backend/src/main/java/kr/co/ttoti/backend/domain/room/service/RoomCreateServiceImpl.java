package kr.co.ttoti.backend.domain.room.service;


import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.room.dto.RoomCreateRequest;
import kr.co.ttoti.backend.domain.room.dto.RoomIdDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalTime;

@RequiredArgsConstructor
@Transactional
@Service
public class RoomCreateServiceImpl implements RoomCreateService {

	private final RoomRepository roomRepository;

	@Override
	public RoomIdDto createRoom(Integer memberId, RoomCreateRequest roomCreateRequest) {
		LocalTime time = roomCreateRequest.getFinishTime();
		if(time.getMinute() % 30 != 0) throw new CustomException(ErrorCode.ROOM_FINISHED_TIME_IS_VALIDATION);

		return RoomIdDto.builder()
			.roomId(roomRepository.save(new Room(memberId, roomCreateRequest)).getRoomId())
			.build();
	}
}
