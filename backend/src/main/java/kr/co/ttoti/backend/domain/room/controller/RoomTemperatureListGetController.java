package kr.co.ttoti.backend.domain.room.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.dto.RoomTemperatureListGetDto;
import kr.co.ttoti.backend.domain.room.service.RoomTemperatureGetService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomTemperatureListGetController {

	private final RoomTemperatureGetService roomTemperatureGetService;

	@GetMapping("/{room-id}/temperature")
	ResponseEntity<ResponseDto<RoomTemperatureListGetDto>> getRoomTemperature(@MemberId Integer memberId,
		@PathVariable(name="room-id") Integer roomId) {

		return ResponseEntity.ok(ResponseDto.success(
			SuccessCode.OK, roomTemperatureGetService.getRoomTemperatureList(memberId, roomId)));
	}
}
