package kr.co.ttoti.backend.domain.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.ttoti.backend.domain.notification.entity.Notification;
import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.notification.repository.NotificationRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationInsertServiceImpl implements NotificationInsertService {

	private final NotificationRepository notificationRepository;
	private final RoomMemberRepository roomMemberRepository;

	public void insertNotificationToMemberInRoom(Integer memberId, Integer roomId, NotificationType notificationType) {
		notificationRepository.save(Notification.builder()
			.memberId(memberId)
			.roomId(roomId)
			.notificationTitle(notificationType.getTitle())
			.notificationReason(notificationType.getReason())
			.notificationIsRead(false)
			.build());
	}

	public void insertNotificationToAllMembersInRoom(Room room, NotificationType notificationType) {
		List<Integer> roomMemberIdList = roomMemberRepository.findMemberIdsByRoomAndIsDeletedFalse(room);
		Integer roomId = room.getRoomId();
		roomMemberIdList.forEach(
			roomMemberId -> insertNotificationToMemberInRoom(roomMemberId, roomId,
				notificationType));
	}
}
