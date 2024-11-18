package kr.co.ttoti.backend.domain.room.controller;

import java.util.List;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.room.dto.RoomSummaryDto;
import kr.co.ttoti.backend.domain.room.service.RoomListGetService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomListGetController {

	private final RoomListGetService roomListGetService;

	@GetMapping("/my")
	public ResponseDto<List<RoomSummaryDto>> getRoomList(@MemberId Integer memberId){
		return ResponseDto.success(SuccessCode.OK, roomListGetService.getRoomList(memberId));
	}
}
