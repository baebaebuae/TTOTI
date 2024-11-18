package kr.co.ttoti.backend.domain.room.dto;

import java.time.LocalTime;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class RoomUpdateRequest {

	@NotBlank
	@Size(min = 1, max = 8)
	private String name;
	@Min(4)
	@Max(8)
	private Integer participants;
	@Min(1)
	@Max(14)
	private Integer period;
}
