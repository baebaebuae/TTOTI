package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.domain.room.dto.RoomInProgressDto;
import kr.co.ttoti.backend.domain.room.dto.RoomMemberListPendingDto;
import kr.co.ttoti.backend.domain.room.dto.RoomPendingDto;

public interface RoomGetService {

	/**
	 * 방의 상태값을 반환해주며, 방이 시작되기 전이면 false, 방이 시작된 후 진행중이면 true를 반환한다
	 * @param memberId
	 * @param roomId
	 * @return
	 */
	Boolean getRoomStatus(Integer memberId, Integer roomId);

	/**
	 * 게임 시작 전, 방의 정보를 반환한다
	 * @param memberId
	 * @param roomId
	 * @return
	 */
	RoomPendingDto getRoomIfPending(Integer memberId, Integer roomId);

	/**
	 * 새로고침 시, 방 회원 준비 상태를 반환한다
	 * @param memberId
	 * @param roomId
	 * @return
	 */
	RoomMemberListPendingDto getRoomMemberListIfPending(Integer memberId, Integer roomId);

	/**
	 * 방 회원이 초대 링크를 요청하면, 해당 방의 유효한 초대 링크를 반환한다
	 * @param memberId
	 * @param roomId
	 * @return
	 */
	String getRoomLink(Integer memberId, Integer roomId);

	/**
	 * 진행중인 방에 입장했을 때 방장 이름, 방 제목, 마니또 관계를 조회한다.
	 * @param memberId
	 * @param roomId
	 * @return
	 */
	RoomInProgressDto getRoomIfInProgress(Integer memberId, Integer roomId);
}
