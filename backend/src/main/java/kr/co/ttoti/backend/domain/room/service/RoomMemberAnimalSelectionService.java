package kr.co.ttoti.backend.domain.room.service;

import java.util.List;

import kr.co.ttoti.backend.domain.animal.dto.AnimalDto;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.domain.room.dto.RoomMemberAnimalSelectRequest;
import kr.co.ttoti.backend.domain.room.dto.RoomStartDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;

public interface RoomMemberAnimalSelectionService {

	/**
	 * 동물을 선택 요청을 처리한다.
	 * 1. 모두가 동물을 선택한 경우 startRoom을 호출한다.
	 * 2. 아직 모두 레디하지 않은 경우 내가 선택한 동물 정보를 반환한다.
	 * @param memberId
	 * @param roomId
	 * @param roomMemberAnimalSelectRequest
	 * @return
	 */
	Object handleAnimalSelection(Integer memberId,
		Integer roomId,
		RoomMemberAnimalSelectRequest roomMemberAnimalSelectRequest);

	/**
	 * 선택한 동물 정보, 레디 상태를 업데이트한다.
	 * @param room
	 * @param member
	 * @param roomMemberAnimalSelectRequest
	 * @return
	 */
	AnimalDto updateRoomMemberAnimal(Room room, Member member,
		RoomMemberAnimalSelectRequest roomMemberAnimalSelectRequest);

	/**
	 * 방을 시작한다.
	 * 1. createTtoti를 호출해 랜덤 마니또 매칭
	 * 2. insertQuiz를 호출해 퀴즈 추가
	 * @param room
	 * @param readyRoomMemberList
	 * @param roomMember
	 * @return
	 */
	RoomStartDto startRoom(Room room, List<RoomMember> readyRoomMemberList, RoomMember roomMember, Member member);

	/**
	 * 랜덤으로 마니또를 매칭한다.
	 * @param room
	 * @param roomMemberList
	 * @param roomMember
	 * @return
	 */
	Integer createTtoti(Room room, List<RoomMember> roomMemberList, RoomMember roomMember);

}
