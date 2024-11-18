package kr.co.ttoti.backend.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationDto {

	String notificationReason;
	String title;
}
