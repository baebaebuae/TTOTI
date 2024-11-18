package kr.co.ttoti.backend.domain.quiz.dto;

import java.time.LocalDate;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class QuizHistoryDto {

	Integer ttotiId;

	Integer quizId;
	
	LocalDate quizDate;
	String quizChoiceContent;

	String quizType;
	Map<Integer, String> quizChoiceMap;

	Boolean isManittoAnswered;
	Integer manittoAnswer;

	Boolean isManitiAnswered;
	Integer manitiAnswer;

	Boolean quizAnswerIsCorrect;
}
