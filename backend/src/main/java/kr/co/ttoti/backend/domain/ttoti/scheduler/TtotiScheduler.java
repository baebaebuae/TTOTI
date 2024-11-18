package kr.co.ttoti.backend.domain.ttoti.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.quiz.service.common.QuizServiceUtils;
import kr.co.ttoti.backend.domain.room.common.RoomServiceUtils;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.ttoti.service.TemperatureInsertService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TtotiScheduler {

	private final TemperatureInsertService temperatureInsertService;
	private final QuizServiceUtils quizServiceUtils;
	private final RoomServiceUtils roomServiceUtils;

	@Scheduled(cron = "0 58 23 * * ?")
	public void checkTemperatureChanges() {
		roomServiceUtils.getInProgressRoomList().forEach(this::processRoomTemperatureChanges);
	}

	@Transactional
	public void processRoomTemperatureChanges(Room room) {
		List<QuizAnswer> todayQuizAnswerList = quizServiceUtils.getTodayQuizAnswer(room.getRoomId());

		todayQuizAnswerList.forEach(quizAnswer ->
			temperatureInsertService.insertTemperatureForQuizAnswer(quizAnswer, room.getRoomPeriod())
		);
	}
}
