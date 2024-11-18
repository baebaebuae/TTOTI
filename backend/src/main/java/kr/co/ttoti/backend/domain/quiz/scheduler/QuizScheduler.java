package kr.co.ttoti.backend.domain.quiz.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.quiz.service.QuizInsertService;
import kr.co.ttoti.backend.domain.room.common.RoomServiceUtils;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuizScheduler {

	private final QuizInsertService quizInsertService;
	private final RoomServiceUtils roomServiceUtils;

	@Scheduled(cron = "0 5 0 * * ?")
	public void insertQuizToInProgressTtoti() {
		roomServiceUtils.getInProgressRoomList().forEach(room -> quizInsertService.insertQuiz(room.getRoomId()));
	}
}
