package kr.co.ttoti.backend.domain.room.controller;

import java.util.concurrent.ExecutionException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.animal.dto.AnimalSelectDto;
import kr.co.ttoti.backend.domain.room.dto.RoomMemberAnimalSelectRequest;
import kr.co.ttoti.backend.domain.room.service.RoomMemberAnimalSelectionService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/rooms")
public class RoomMemberAnimalSelectionController {

	private final RoomMemberAnimalSelectionService roomMemberAnimalSelectService;

	@PostMapping("{room-id}/animals")
	ResponseEntity<ResponseDto<?>> selectAnimal(@MemberId Integer memberId, @PathVariable("room-id") Integer roomId,
		@RequestBody RoomMemberAnimalSelectRequest roomMemberAnimalSelectRequest) throws
		ExecutionException,
		InterruptedException {

		Object result = roomMemberAnimalSelectService.handleAnimalSelection(memberId, roomId,
			roomMemberAnimalSelectRequest);
		if (result instanceof AnimalSelectDto) {
			return ResponseEntity.ok(ResponseDto.success(SuccessCode.ANIMAL_SELECT_SUCCESS, result));
		}
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.ROOM_START_SUCCESS, result));
	}
}
