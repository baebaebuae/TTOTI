package kr.co.ttoti.backend.domain.room.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RoomMemberAnimalSelectRequest {

	@NotBlank
	private Integer animalId;
}
