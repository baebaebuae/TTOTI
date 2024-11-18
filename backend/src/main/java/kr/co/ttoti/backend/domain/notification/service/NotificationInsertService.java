package kr.co.ttoti.backend.domain.notification.service;

import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.room.entity.Room;

public interface NotificationInsertService {

	void insertNotificationToMemberInRoom(Integer memberId, Integer roomId, NotificationType notificationType);

	void insertNotificationToAllMembersInRoom(Room room, NotificationType notificationType);

}
