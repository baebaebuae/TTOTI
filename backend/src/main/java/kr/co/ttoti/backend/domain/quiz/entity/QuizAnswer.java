package kr.co.ttoti.backend.domain.quiz.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "quiz_answer")
public class QuizAnswer extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "quiz_answer_id")
	private Integer quizAnswerId;

	@NotNull
	@Column(name = "ttoti_id")
	private Integer ttotiId;

	@NotNull
	@Column(name = "room_id")
	private Integer roomId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quiz_id")
	private Quiz quiz;

	@NotNull
	@Column(name = "is_manitto_answered")
	private Boolean isManittoAnswered;

	@Column(name = "manitto_answer")
	private Integer manittoAnswer;

	@Column(name = "manitto_answer_at")
	private LocalDateTime manittoAnswerAt;

	@NotNull
	@Column(name = "is_maniti_answered")
	private Boolean isManitiAnswered;

	@Column(name = "maniti_answer")
	private Integer manitiAnswer;

	@Column(name = "maniti_answer_at")
	private LocalDateTime manitiAnswerAt;

	@NotNull
	@Column(name = "quiz_date")
	private LocalDate quizDate;

	@NotNull
	@Column(name = "quiz_answer_is_correct")
	private Boolean quizAnswerIsCorrect;

	public void updateManittoQuizAnswer(Integer manittoAnswer) {
		this.isManittoAnswered = true;
		this.manittoAnswer = manittoAnswer;
		this.manittoAnswerAt = LocalDateTime.now();
	}

	public void updateManitiQuizAnswer(Integer manitiAnswer) {
		this.isManitiAnswered = true;
		this.manitiAnswer = manitiAnswer;
		this.manitiAnswerAt = LocalDateTime.now();
	}

	public void updateQuizAnswerIsCorrect(Boolean quizAnswerIsCorrect) {
		this.quizAnswerIsCorrect = quizAnswerIsCorrect;
	}
}