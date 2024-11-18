package kr.co.ttoti.backend.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomTemperatureDto {

	private Integer memberId;
	private String memberName;
	private String memberProfileImageUrl;

	private Float previousTemperature;
	private Float temperatureDifference;
	private Float currentTemperature;
}
