package kr.co.ttoti.backend.domain.ttoti.entity;

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
import kr.co.ttoti.backend.domain.animal.entity.Animal;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.domain.room.entity.Room;
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
@Table(name = "ttoti")
public class Ttoti extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ttoti_id")
	private Integer ttotiId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private Room room;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animal_id")
	private Animal animal;

	@NotNull
	@Column(name = "maniti_id")
	private Integer manitiId;

	@NotNull
	@Column(name = "ttoti_animal_name")
	private String ttotiAnimalName;

	@NotNull
	@Column(name = "ttoti_temperature")
	private Float ttotiTemperature;

	@Column(name = "titto_id")
	private Integer tittoId;

	@NotNull
	@Column(name = "ttoti_chat_is_finished")
	private Boolean ttotiChatIsFinished;

	public void updateTittoId(Integer ttotiId) {
		this.tittoId = ttotiId;
	}

	public void updateTtotiChatIsFinished(Boolean ttotiChatIsFinished) {
		this.ttotiChatIsFinished = ttotiChatIsFinished;
	}

	public void updateTtotiTemperature(Float ttotiTemperature) {
		this.ttotiTemperature = ttotiTemperature;
	}

}