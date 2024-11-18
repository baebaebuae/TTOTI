package kr.co.ttoti.backend.domain.room.dto;

import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomStartDto {

	TtotiMatchDto ttotiMatchInfo;

	QuizHistoryDto todayManittoQuiz;
	QuizHistoryDto todayManitiQuiz;
}
