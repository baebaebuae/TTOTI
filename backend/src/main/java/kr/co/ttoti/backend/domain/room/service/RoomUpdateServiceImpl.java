package kr.co.ttoti.backend.domain.room.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.dto.RoomUpdateRequest;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class RoomUpdateServiceImpl implements RoomUpdateService {

	private final Validator validator;
	private final RoomMemberRepository roomMemberRepository;

	@Override
	@Transactional
	public void updateRoom(Integer memberId, Integer roomId, RoomUpdateRequest roomUpdateRequest) {

		Member member = validator.validateMember(memberId);
		Room room = validator.validateRoom(roomId);
		validator.validateMemberRoomAuthorization(room, member);

		if(room.getRoomIsStarted()){
			throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);
		}

		if(!room.getRoomHostMemberId().equals(memberId)) {
			throw new CustomException(ErrorCode.ROOM_UPDATE_UNAUTHORIZED);
		}

		Integer currentRoomParticipants = roomMemberRepository.countByRoomAndRoomMemberIsDeletedFalse(room);

		if(currentRoomParticipants > roomUpdateRequest.getParticipants()){
			throw new CustomException(ErrorCode.ROOM_PARTICIPANTS_TOO_LOW);
		}

		room.updateRoom(roomUpdateRequest);

	}
}
