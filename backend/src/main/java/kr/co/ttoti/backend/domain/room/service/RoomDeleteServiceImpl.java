package kr.co.ttoti.backend.domain.room.service;

import kr.co.ttoti.backend.global.auth.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomDeleteServiceImpl implements RoomDeleteService {

	private final Validator validator;
	private final RoomRepository roomRepository;
	private final RoomMemberRepository roomMemberRepository;

	@Override
	@Transactional
	public Boolean deleteRoom(Integer memberId, Integer roomId) {

		Member member = validator.validateMember(memberId);
		Room room = validator.validateRoom(roomId);

		if (room.getRoomIsStarted()) {
			throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);
		}

		Member hostMember = validator.validateMember(room.getRoomHostMemberId());

		if (memberId.equals(hostMember.getMemberId())) {
			deleteAllRoomMembersAndRoom(room);
			return true;
		}

		RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);
		roomMember.deleteRoomMember();
		return false;
	}

	private void deleteAllRoomMembersAndRoom(Room room) {
		roomMemberRepository.findByRoomAndRoomMemberIsDeletedFalse(room)
			.forEach(RoomMember::deleteRoomMember);
		room.deleteRoom();
	}
}
