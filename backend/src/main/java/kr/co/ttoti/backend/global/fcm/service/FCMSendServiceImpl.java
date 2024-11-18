package kr.co.ttoti.backend.global.fcm.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FCMSendServiceImpl implements FCMSendService {

	private final RedisUtil redisUtil;
	private final Validator validator;
	private final RoomMemberRepository roomMemberRepository;

	private final String redisFCMTokenKey = "fcm_token:";

	public void sendToFCM(Integer memberId, NotificationType notificationType) throws
		ExecutionException,
		InterruptedException {

		validator.validateMember(memberId);
		String fcmTokenKey = redisFCMTokenKey + memberId.toString();
		String token = redisUtil.getData(fcmTokenKey);

		if (token == null) {
			return;
		}
		Message message = Message.builder()
			.setToken(token)
			.setWebpushConfig(WebpushConfig.builder()
				.setNotification(new WebpushNotification(notificationType.getTitle(), notificationType.getContent()))
				.build())
			.build();
		FirebaseMessaging.getInstance().sendAsync(message).get();
	}

	public void sendToRoomMembers(Room room, NotificationType notificationType) {
		roomMemberRepository.findMemberIdsByRoomAndIsDeletedFalse(room)
			.forEach(roomMemberId -> {
				try {
					sendToFCM(
						roomMemberId,
						notificationType
					);
				} catch (ExecutionException | InterruptedException e) {
					e.printStackTrace();
				}
			});
	}

	public void sendToFCMWithRoomName(Integer memberId, NotificationType notificationType, String roomName) throws
		ExecutionException,
		InterruptedException {

		validator.validateMember(memberId);
		String fcmTokenKey = redisFCMTokenKey + memberId.toString();
		String token = redisUtil.getData(fcmTokenKey);

		String prefix = "["+roomName+"] ";

		if (token == null) {
			return;
		}
		Message message = Message.builder()
			.setToken(token)
			.setWebpushConfig(WebpushConfig.builder()
				.setNotification(new WebpushNotification(notificationType.getTitle(), prefix+notificationType.getContent()))
				.build())
			.build();
		FirebaseMessaging.getInstance().sendAsync(message).get();
	}

	public void sendToRoomMembersWithRoomName(Room room, NotificationType notificationType, String roomName) {
		roomMemberRepository.findMemberIdsByRoomAndIsDeletedFalse(room)
			.forEach(roomMemberId -> {
				try {
					sendToFCMWithRoomName(
						roomMemberId,
						notificationType,
						roomName
					);
				} catch (ExecutionException | InterruptedException e) {
					e.printStackTrace();
				}
			});
	}
}
