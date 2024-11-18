package kr.co.ttoti.backend.domain.room.controller;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.service.RoomDeleteService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomDeleteController {

	private final RoomDeleteService roomDeleteService;

	@DeleteMapping("/{room-id}")
	ResponseEntity<ResponseDto<?>> deleteRoom(@MemberId Integer memberId,
		@PathVariable(name = "room-id") Integer roomId) {
		Boolean isHostLeaving = roomDeleteService.deleteRoom(memberId, roomId);
		if(isHostLeaving){
			return ResponseEntity.ok(ResponseDto.success(SuccessCode.ROOM_DELETE_SUCCESS));
		}
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.ROOM_MEMBER_DELETE_SUCCESS));
	}

}
