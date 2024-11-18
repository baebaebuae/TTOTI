package kr.co.ttoti.backend.domain.room.controller;

import kr.co.ttoti.backend.domain.room.dto.RoomIdDto;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.service.RoomMemberCreateService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomMemberCreateController {

	private final RoomMemberCreateService roomMemberCreateService;

	@GetMapping("/code/{room-code}")
	public ResponseEntity<ResponseDto<RoomIdDto>> createRoomMemberByRoomCode(@MemberId Integer memberId, @PathVariable("room-code") String roomCode) {
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.CREATE_ROOM_MEMBER_SUCCESS, roomMemberCreateService.createRoomMemberByRoomCode(memberId, roomCode)));
	}

}