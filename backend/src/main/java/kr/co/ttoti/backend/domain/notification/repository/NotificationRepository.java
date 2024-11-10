package kr.co.ttoti.backend.domain.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.ttoti.backend.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

	List<Notification> findByRoomIdAndMemberIdAndNotificationIsRead(Integer roomId, Integer memberId, Boolean notificationIsRead);
}
