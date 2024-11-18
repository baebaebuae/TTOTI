package kr.co.ttoti.backend.global.fcm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.fcm.dto.FCMDeviceTokenCreateRequest;
import kr.co.ttoti.backend.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/fcm")
public class FCMController {

	private final RedisUtil redisUtil;

	@PostMapping("/device-token")
	public ResponseEntity<Void> saveFCMToken(@RequestBody FCMDeviceTokenCreateRequest fcmDeviceTokenCreateRequest,
		@MemberId Integer memberId) {
		redisUtil.setDeviceToken(fcmDeviceTokenCreateRequest, memberId);
		return ResponseEntity.ok(null);
	}
}
