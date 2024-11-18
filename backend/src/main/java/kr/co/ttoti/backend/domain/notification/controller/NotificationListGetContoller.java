package kr.co.ttoti.backend.domain.notification.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.notification.dto.NotificationDto;
import kr.co.ttoti.backend.domain.notification.service.NotificationListGetService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/notifications")
public class NotificationListGetContoller {

	private final NotificationListGetService notificationListGetService;

	@GetMapping("{room-id}")
	public ResponseEntity<ResponseDto<List<NotificationDto>>> getNotificationList(@MemberId Integer memberId, @PathVariable(name = "room-id") Integer roomId){

		List<NotificationDto> notificationDtoList = notificationListGetService.getNotificationList(memberId, roomId);

		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK, notificationDtoList));
	}
}
