package kr.co.ttoti.backend.domain.room.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.notification.service.NotificationInsertService;
import kr.co.ttoti.backend.domain.room.common.RoomServiceUtils;
import kr.co.ttoti.backend.domain.ttoti.common.TtotiServiceUtils;
import kr.co.ttoti.backend.domain.ttoti.scheduler.TtotiScheduler;
import kr.co.ttoti.backend.global.fcm.service.FCMSendService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoomScheduler {

	private final TtotiScheduler ttotiScheduler;
	private final RoomServiceUtils roomServiceUtils;
	private final TtotiServiceUtils ttotiServiceUtils;
	private final NotificationInsertService notificationInsertService;
	private final FCMSendService fcmSendService;

	@Scheduled(cron = "0 0/30 * * * ?")
	@Transactional
	public void checkFinishedRooms() {

		roomServiceUtils.getInProgressRoomListByFinishDateAndTime().forEach(room -> {

			ttotiScheduler.processRoomTemperatureChanges(room);

			ttotiServiceUtils.finishTtotiChat(room);

			roomServiceUtils.finishInProgressRooms(room);

			// ttoti-ending에 개인 기록 저장
			ttotiServiceUtils.calculateTtotiEnding(room);

			// mongoDB에 room_ending에 1등 유저 목록, 마니또 마니띠 목록 저장
			roomServiceUtils.calculateRoomEnding(room);

			notificationInsertService.insertNotificationToAllMembersInRoom(room, NotificationType.GAME_END);
			fcmSendService.sendToRoomMembersWithRoomName(room, NotificationType.GAME_END, room.getRoomName());
		});
	}
}