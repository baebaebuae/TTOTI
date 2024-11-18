package kr.co.ttoti.backend.domain.room.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.dto.RoomUpdateRequest;
import kr.co.ttoti.backend.domain.room.service.RoomUpdateService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/rooms/")
public class RoomUpdateController {

	private final RoomUpdateService roomUpdateService;

	@PatchMapping("{room-id}")
	ResponseEntity<ResponseDto<?>> updateRoomInfo(@MemberId Integer memberId, @PathVariable("room-id") Integer roomId,
		@RequestBody RoomUpdateRequest roomUpdateRequest) {

		roomUpdateService.updateRoom(memberId, roomId, roomUpdateRequest);

		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK));
	}
}
