package kr.co.ttoti.backend.global.fcm.service;

import java.util.concurrent.ExecutionException;

import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.room.entity.Room;

public interface FCMSendService {

	void sendToFCM(Integer memberId, NotificationType notificationType) throws
		ExecutionException,
		InterruptedException;

	void sendToRoomMembers(Room room, NotificationType notificationType);

	void sendToFCMWithRoomName(Integer memberId, NotificationType notificationType, String roomName) throws
		ExecutionException,
		InterruptedException;

	void sendToRoomMembersWithRoomName(Room room, NotificationType notificationType, String roomName);
}