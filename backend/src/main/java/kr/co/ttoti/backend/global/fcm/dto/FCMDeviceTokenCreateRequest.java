package kr.co.ttoti.backend.global.fcm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FCMDeviceTokenCreateRequest {

	private String deviceToken;
}
