package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.domain.room.dto.RoomCreateRequest;
import kr.co.ttoti.backend.domain.room.dto.RoomIdDto;

public interface RoomCreateService {

	/**
	 * 회원은 방의 이름, 방의 인원, 방의 기간, 방 종료 시간을 설정해 방을 생성할 수 있다
	 * @param memberId
	 * @param roomCreateRequest
	 */
	RoomIdDto createRoom(Integer memberId, RoomCreateRequest roomCreateRequest);
}
