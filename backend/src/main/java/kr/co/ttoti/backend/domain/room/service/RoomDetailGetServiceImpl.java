package kr.co.ttoti.backend.domain.room.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.dto.RoomInProgressDetailGetDto;
import kr.co.ttoti.backend.domain.room.dto.RoomPendingDetailGetDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomDetailGetServiceImpl implements RoomDetailGetService {

	private final RoomMemberRepository roomMemberRepository;
	private final Validator validator;

	public String timeFormatt(LocalTime time) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		return time.format(formatter);
	}

	@Override
	public RoomPendingDetailGetDto getRoomPendingDetail(Integer memberId, Integer roomId) {

		Room room = validator.validateRoom(roomId);
		if (room.getRoomIsStarted()) {
			throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);
		}
		Member hostMember = validator.validateRoomHost(room);
		Member member = validator.validateMember(memberId);
		validator.validateMemberRoomAuthorization(room, member);


		return RoomPendingDetailGetDto.builder()
			.roomName(room.getRoomName())
			.roomHostMemberName(hostMember.getMemberName())
			.roomFinishTime(timeFormatt(room.getRoomFinishTime()))
			.roomPeriod(room.getRoomPeriod())
			.roomCurrentParticipants(roomMemberRepository.countByRoomAndRoomMemberIsDeletedFalse(room))
			.roomTotalParticipants(room.getRoomParticipants())
			.isHost(memberId.equals(hostMember.getMemberId()))
			.build();
	}

	@Override
	public RoomInProgressDetailGetDto getRoomInProgressDetail(Integer memberId, Integer roomId) {

		Room room = validator.validateRoom(roomId);
		if (!room.getRoomIsStarted()) {
			throw new CustomException(ErrorCode.ROOM_IS_PENDING);
		}
		Member member = validator.validateMember(memberId);
		Member hostMember = validator.validateRoomHost(room);
		validator.validateMemberRoomAuthorization(room, member);

		List<String> roomMemberNameList = roomMemberRepository.findByRoomAndRoomMemberIsDeletedFalse(room).stream()
			.map(roomMember -> roomMember.getMember().getMemberName()).toList();

		return RoomInProgressDetailGetDto.builder()
			.roomName(room.getRoomName())
			.roomHostMemberName(hostMember.getMemberName())
			.roomParticipants(room.getRoomParticipants())
			.roomParticipantsNameList(roomMemberNameList)
			.roomFinishTime(timeFormatt(room.getRoomFinishTime()))
			.roomStartDate(room.getRoomStartDate())
			.roomFinishDate(room.getRoomFinishDate())
			.roomPeriod(room.getRoomPeriod())
			.build();
	}
}
