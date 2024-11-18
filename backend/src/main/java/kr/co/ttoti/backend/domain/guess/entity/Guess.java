package kr.co.ttoti.backend.domain.guess.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.global.auth.entity.Member;
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
@Table(name = "guess")
public class Guess extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "guess_id")
	private Integer guessId;

	@NotNull
	@Column(name = "member_id")
	private Integer memberId;

	@NotNull
	@Column(name = "room_id")
	private Integer roomId;

	@NotNull
	@Column(name = "titto_id")
	private Integer tittoId;

	@Column(name = "guess_member_id")
	private Integer guessMemberId;

	@NotNull
	@Column(name = "guess_is_correct")
	private Boolean guessIsCorrect;

	@NotNull
	@Column(name = "guess_is_final")
	private Boolean guessIsFinal;

	@Column(name = "guess_date")
	private LocalDate guessDate;

	@NotNull
	@Column(name = "guess_is_answered")
	private Boolean guessIsAnswered;

	@Column(name = "guess_answer_at")
	private LocalDateTime guessAnswerAt;


	public void updateAnswer(Member myManitto, Member guessMember){
		this.guessMemberId = guessMember.getMemberId();
		this.guessIsCorrect = myManitto.equals(guessMember);
		this.guessIsAnswered = true;
		this.guessAnswerAt = LocalDateTime.now();
	}
}