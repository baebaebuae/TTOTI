package kr.co.ttoti.backend.domain.room.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.domain.room.dto.RoomCreateRequest;
import kr.co.ttoti.backend.domain.room.dto.RoomUpdateRequest;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "room")
public class Room extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_id")
	private Integer roomId;

	// FK
	@NotNull
	@Column(name = "room_host_member_id")
	private Integer roomHostMemberId;

	@NotNull
	@Column(name = "room_name")
	private String roomName;

	@NotNull
	@Min(value = 4)
	@Max(value = 8)
	@Column(name = "room_participants")
	private Integer roomParticipants;

	@NotNull
	@Column(name = "room_period")
	private Integer roomPeriod;

	@NotNull
	@Column(name = "room_code")
	private String roomCode;

	@NotNull
	@Column(name = "room_is_started")
	private Boolean roomIsStarted;

	@Column(name = "room_start_date")
	private LocalDate roomStartDate;

	@Column(name = "room_start_time")
	private LocalTime roomStartTime;

	@Column(name = "room_mid_date")
	private LocalDate roomMidDate;

	@Column(name = "room_finish_date")
	private LocalDate roomFinishDate;

	@Column(name = "room_finish_time")
	private LocalTime roomFinishTime;

	@NotNull
	@Column(name = "room_is_finished")
	private Boolean roomIsFinished;

	@NotNull
	@Column(name = "room_is_deleted")
	private Boolean roomIsDeleted;

	@Column(name = "room_deleted_at")
	private LocalDateTime roomDeletedAt;

	@Builder
	public Room(Integer memberId, RoomCreateRequest roomCreateRequest) {
		this.roomHostMemberId = memberId;
		this.roomName = roomCreateRequest.getName();
		this.roomParticipants = roomCreateRequest.getParticipants();
		this.roomPeriod = roomCreateRequest.getPeriod();
		this.roomCode = UUID.randomUUID().toString();
		this.roomIsStarted = Boolean.FALSE;
		this.roomIsFinished = Boolean.FALSE;
		this.roomFinishTime = roomCreateRequest.getFinishTime();
		this.roomIsDeleted = Boolean.FALSE;
	}

	public void startRoom(){
		this.roomIsStarted = true;
		this.roomStartDate = LocalDate.now();
		this.roomStartTime = LocalTime.now();
		this.roomMidDate = LocalDate.now().plusDays(this.roomPeriod / 2);
		this.roomFinishDate = LocalDate.now().plusDays(this.roomPeriod);
	}

	public void deleteRoom(){
		this.roomIsDeleted = true;
		this.roomDeletedAt = LocalDateTime.now();
	}

	public void finishRoom(){
		this.roomIsFinished = true;
	}

	public void updateRoom(RoomUpdateRequest roomUpdateRequest){
		this.roomName = roomUpdateRequest.getName();
		this.roomParticipants = roomUpdateRequest.getParticipants();
		this.roomPeriod = roomUpdateRequest.getPeriod();
	}
}