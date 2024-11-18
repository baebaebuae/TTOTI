package kr.co.ttoti.backend.domain.notification.service;

import java.util.List;

import kr.co.ttoti.backend.domain.notification.dto.NotificationDto;

public interface NotificationListGetService {

	List<NotificationDto> getNotificationList(Integer memberId, Integer roomId);
}
