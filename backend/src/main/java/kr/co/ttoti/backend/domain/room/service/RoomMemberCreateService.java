package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.domain.room.dto.RoomIdDto;

public interface RoomMemberCreateService {

	/**
	 * 방 생성 후, 방장을 방 회원으로 등록한다
	 * @param memberId
	 * @param roomId
	 */
	void createRoomMember(Integer memberId, Integer roomId);

	/**
	 * 방 회원은, 방 초대 코드를 통해 방에 등록할 수 있다
	 * @param memberId
	 * @param roomCode
	 */
	RoomIdDto createRoomMemberByRoomCode(Integer memberId, String roomCode);
}
