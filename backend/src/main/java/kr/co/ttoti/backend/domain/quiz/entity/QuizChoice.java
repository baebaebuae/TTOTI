package kr.co.ttoti.backend.domain.quiz.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "quiz_choice")
public class QuizChoice extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "quiz_choice_id")
	private Integer quizChoiceId;

	@NotNull
	@Column(name = "quiz_id")
	private Integer quizId;

	@NotNull
	@Column(name = "quiz_choice_content")
	private String quizChoiceContent;

	@NotNull
	@Column(name = "quiz_choice_number")
	private Integer quizChoiceNumber;

}