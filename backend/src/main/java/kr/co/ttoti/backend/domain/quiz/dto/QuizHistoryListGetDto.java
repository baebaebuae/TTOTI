package kr.co.ttoti.backend.domain.quiz.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class QuizHistoryListGetDto {

	List<QuizHistoryDto> manittoQuizList;
	List<QuizHistoryDto> manitiQuizList;

	QuizHistoryDto todayManittoQuiz;
	QuizHistoryDto todayManitiQuiz;
}
