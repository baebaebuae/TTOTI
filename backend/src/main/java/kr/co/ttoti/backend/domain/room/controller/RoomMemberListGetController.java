package kr.co.ttoti.backend.domain.room.controller;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.dto.RoomMemberListPendingDto;
import kr.co.ttoti.backend.domain.room.service.RoomGetService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomMemberListGetController {

	private final RoomGetService roomGetService;

	@GetMapping("/refresh/{room-id}")
	public ResponseDto<RoomMemberListPendingDto> getRoomMemberList(@MemberId Integer memberId,
		@PathVariable("room-id") Integer roomId) {
		return ResponseDto.success(SuccessCode.OK, roomGetService.getRoomMemberListIfPending(memberId, roomId));
	}
}
