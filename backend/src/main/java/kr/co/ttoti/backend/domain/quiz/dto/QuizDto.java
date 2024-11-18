package kr.co.ttoti.backend.domain.quiz.dto;

import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuizDto {

	private Integer quizId;

	private QuizType quizType;

	private String quizContent;

	private Boolean quizIsAvailable;

	public Quiz toEntity(){
		return Quiz.builder()
			.quizId(this.quizId)
			.quizType(this.quizType)
			.quizContent(this.quizContent)
			.quizIsAvailable(this.quizIsAvailable)
			.build();
	}
}
