package kr.co.ttoti.backend.domain.room.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.dto.RoomIdDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class RoomMemberCreateServiceImpl implements RoomMemberCreateService {

	private final MemberRepository memberRepository;
	private final RoomRepository roomRepository;
	private final RoomMemberRepository roomMemberRepository;
	private final Validator validator;

	@Override
	public void createRoomMember(Integer memberId, Integer roomId) {
		Member member = validator.validateMember(memberId);

		Room room = validator.validateRoom(roomId);

		if (roomMemberRepository.findByMemberAndRoom(member, room).isEmpty()) {
			roomMemberRepository.save(new RoomMember(room, member));
		}
	}

	@Override
	@Transactional
	public RoomIdDto createRoomMemberByRoomCode(Integer memberId, String roomCode) {
		Member member = validator.validateMember(memberId);

		Room room = roomRepository.findByRoomCode(roomCode)
			.orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

		int currentParticipants = roomMemberRepository.countByRoomAndRoomMemberIsDeletedFalse(room);

		if (currentParticipants == room.getRoomParticipants()) {
			throw new CustomException(ErrorCode.ROOM_FULL);
		}

		if (room.getRoomIsStarted()) {
			throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);
		}

		RoomMember roomMember = roomMemberRepository.findByMemberAndRoom(member, room).orElse(null);

		if (roomMember == null) {
			roomMemberRepository.save(new RoomMember(room, member));
		} else if (roomMember.getRoomMemberIsDeleted()) {
			roomMember.updateRoomMemberIsDeleted(false);
			roomMember.updateRoomMemberDeletedAt(null);
		}

		return RoomIdDto.builder()
			.roomId(room.getRoomId())
			.build();
	}
}
