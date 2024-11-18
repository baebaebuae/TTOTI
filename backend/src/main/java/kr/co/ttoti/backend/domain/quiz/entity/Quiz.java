package kr.co.ttoti.backend.domain.quiz.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.domain.quiz.dto.QuizDto;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "quiz")
public class Quiz extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "quiz_id")
	private Integer quizId;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "quiz_type")
	private QuizType quizType;

	@NotNull
	@Column(name = "quiz_content")
	private String quizContent;

	@NotNull
	@Column(name = "quiz_is_available")
	private Boolean quizIsAvailable;

	public QuizDto toDto() {
		return QuizDto.builder()
			.quizId(this.quizId)
			.quizType(this.quizType)
			.quizContent(this.quizContent)
			.quizIsAvailable(this.quizIsAvailable)
			.build();
	}

}