package kr.co.ttoti.backend.domain.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.notification.dto.NotificationDto;
import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.notification.repository.NotificationRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.global.auth.entity.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationListGetServiceImpl implements NotificationListGetService {

	private final Validator validator;
	private final NotificationRepository notificationRepository;

	@Override
	@Transactional
	public List<NotificationDto> getNotificationList(Integer memberId, Integer roomId) {

		Member member = validator.validateMember(memberId);
		Room room = validator.validateRoom(roomId);
		validator.validateMemberRoomAuthorization(room, member);

		return notificationRepository.findByRoomIdAndMemberIdOrderByCreatedAtDesc(roomId, memberId).stream()
			.map(notification -> {
				notification.updateIsRead();
				return NotificationDto.builder()
					.notificationReason(notification.getNotificationReason())
					.title(notification.getNotificationTitle())
					.build();
			}).toList();
	}
}
