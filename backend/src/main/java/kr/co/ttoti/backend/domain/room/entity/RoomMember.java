package kr.co.ttoti.backend.domain.room.entity;

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
import kr.co.ttoti.backend.domain.animal.entity.Animal;
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
@Table(name = "room_member")
public class RoomMember extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_member_id")
	private Integer roomMemberId;

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
	@Column(name = "room_member_is_ready")
	private Boolean roomMemberIsReady;

	@Column(name = "room_member_deleted_at")
	private LocalDateTime roomMemberDeletedAt;

	@NotNull
	@Column(name = "room_member_is_deleted")
	private Boolean roomMemberIsDeleted;

	public RoomMember(Room room, Member member) {
		this.room = room;
		this.member = member;
		this.roomMemberIsReady = Boolean.FALSE;
		this.roomMemberIsDeleted = Boolean.FALSE;
	}

	public void updateAnimal(Animal animal) {
		this.animal = animal;
	}

	public void updateRoomMemberIsReady(Boolean roomMemberIsReady) {
		this.roomMemberIsReady = roomMemberIsReady;
	}

	public void deleteRoomMember() {
		this.roomMemberIsDeleted = true;
		this.roomMemberDeletedAt = LocalDateTime.now();
	}

	public void updateRoomMemberIsDeleted(Boolean roomMemberIsDeleted){
		this.roomMemberIsDeleted = roomMemberIsDeleted;
	}

	public void updateRoomMemberDeletedAt(LocalDateTime roomMemberDeletedAt) {
		this.roomMemberDeletedAt = roomMemberDeletedAt;
	}

}