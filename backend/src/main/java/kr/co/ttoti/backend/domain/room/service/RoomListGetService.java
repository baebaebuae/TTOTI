package kr.co.ttoti.backend.domain.room.service;

import java.util.List;

import kr.co.ttoti.backend.domain.room.dto.RoomMemberPendingDto;
import kr.co.ttoti.backend.domain.room.dto.RoomSummaryDto;

public interface RoomListGetService {

	/**
	 * 회원ID로 현재 입장한(준비 전, 준비 후, 진행 중) 방의 목록을 조회할 수 있다
	 * @param memberId
	 * @return 방의 진행 상황, 진행 중일 경우 종료일, 사용자 프로필, 방장 이름, 방 이름, 현재 방 인원을 담아 list로 반환한다
	 */
	List<RoomSummaryDto> getRoomList(Integer memberId);

	/**
	 * 방ID로 방 회원 목록을 조회할 수 있다
	 * @param roomId
	 * @return
	 */
	List<RoomMemberPendingDto> getRoomMemberList(Integer roomId);

	/**
	 * 방ID로 방 회원 수를 조회할 수 있다
	 * @param roomId
	 * @return
	 */
	Integer getCurrentRoomParticipants(Integer roomId);
}
