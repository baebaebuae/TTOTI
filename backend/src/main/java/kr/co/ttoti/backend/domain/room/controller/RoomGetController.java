package kr.co.ttoti.backend.domain.room.controller;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.dto.RoomInProgressDto;
import kr.co.ttoti.backend.domain.room.dto.RoomPendingDto;
import kr.co.ttoti.backend.domain.room.service.RoomGetService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomGetController {

	private final RoomGetService roomGetService;

	@GetMapping("/status/{room-id}")
	public ResponseDto<Boolean> getRoomStatus(@MemberId Integer memberId,
		@PathVariable("room-id") Integer roomId) {
		return ResponseDto.success(SuccessCode.OK, roomGetService.getRoomStatus(memberId, roomId));
	}

	@GetMapping("/pending/{room-id}")
	public ResponseDto<RoomPendingDto> getRoomIfPending(@MemberId Integer memberId,
		@PathVariable("room-id") Integer roomId) {
		RoomPendingDto roomPendingDto = roomGetService.getRoomIfPending(memberId, roomId);
		return ResponseDto.success(SuccessCode.OK, roomPendingDto);
	}

	@GetMapping("/link/get/{room-id}")
	public ResponseDto<String> getRoomLink(@MemberId Integer memberId, @PathVariable("room-id") Integer roomId) {
		return ResponseDto.success(SuccessCode.OK, roomGetService.getRoomLink(memberId, roomId));
	}

	@GetMapping("/inprogress/{room-id}")
	public ResponseEntity<ResponseDto<RoomInProgressDto>> getRoomIfInProgress(@MemberId Integer memberId,
		@PathVariable("room-id") Integer roomId){
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK, roomGetService.getRoomIfInProgress(memberId, roomId)));
	}

}