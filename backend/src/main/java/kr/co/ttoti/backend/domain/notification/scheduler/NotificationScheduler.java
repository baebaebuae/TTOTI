package kr.co.ttoti.backend.domain.notification.scheduler;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.ExecutionException;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.guess.repository.GuessRepository;
import kr.co.ttoti.backend.domain.notification.service.NotificationInsertServiceImpl;
import kr.co.ttoti.backend.global.auth.entity.Member;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.notification.dto.UnAnsweredMemberDto;
import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.notification.service.NotificationInsertService;
import kr.co.ttoti.backend.domain.room.common.RoomServiceUtils;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.global.fcm.service.FCMSendService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final Validator validator;

    private final RoomServiceUtils roomServiceUtils;
    private final RoomRepository roomRepository;
    private final NotificationInsertService notificationInsertService;
    private final FCMSendService fcmSendService;
    private final GuessRepository guessRepository;
    private final NotificationInsertServiceImpl notificationInsertServiceImpl;

    @Scheduled(cron = "0 5 10 * * ?")
    @Transactional
    public void processMorningNotifications() {
        roomServiceUtils.getInProgressRoomList().forEach(
                room -> notificationInsertService.insertNotificationToAllMembersInRoom(room,
                        NotificationType.TODAY_QUIZ_OPENED));

        roomRepository.findMemberIdsWithActiveGames().forEach(
                memberId -> {
                    try {
                        fcmSendService.sendToFCM(memberId, NotificationType.TODAY_QUIZ_OPENED);
                    } catch (ExecutionException | InterruptedException e) {
                        e.printStackTrace();
                    }
                }
        );
    }

    @Scheduled(cron = "0 5 20 * * ?")
    public void processQuizReminder() throws ExecutionException, InterruptedException {
        List<UnAnsweredMemberDto> unAnsweredMemberList = roomRepository.findMemberIdsWithUnansweredQuizzes(
                LocalDate.now());

        for (UnAnsweredMemberDto unAnsweredMemberDto : unAnsweredMemberList) {
            notificationInsertService.insertNotificationToMemberInRoom(unAnsweredMemberDto.getMemberId(),
                    unAnsweredMemberDto.getRoomId(),
                    NotificationType.QUIZ_ANSWER_REMINDER);

            fcmSendService.sendToFCMWithRoomName(unAnsweredMemberDto.getMemberId(),
                    NotificationType.QUIZ_ANSWER_REMINDER, unAnsweredMemberDto.getRoomName());
        }
    }

    @Scheduled(cron = "0 0/30 * * * ?")
    public void IsGuessCorrectNotifications() throws ExecutionException, InterruptedException {
        LocalDate date = LocalDate.now();

        // 방의 중간날짜가 전날이거나, 종료날짜가 오늘인 방 중, 종료시간이 30분 후인 방에 대해
        roomRepository.getRoomByDatesAndRoomFinishTime(date.minusDays(1), date, LocalTime.now().plusMinutes(30))
                // 각 방에 해당하는 추측 정보를 바탕으로
                .forEach(room -> guessRepository.findByRoomIdAndGuessDate(room.getRoomId(), date.minusDays(1))
                        .forEach(guess -> {
                            Member myManitto = validator.validateTtoti(guess.getTittoId()).getMember();
                            notificationInsertServiceImpl.insertNotificationToMemberInRoom(myManitto.getMemberId(), guess.getRoomId(), guess.getGuessIsCorrect() ? NotificationType.GUESS_IS_CORRECT : NotificationType.GUESS_IS_WRONG);
                        }));
    }
}
