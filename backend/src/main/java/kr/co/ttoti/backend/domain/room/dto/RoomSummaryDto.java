package kr.co.ttoti.backend.domain.room.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomSummaryDto {

	Integer roomId;

	Boolean isRoomInProgress;

	String finishedAt;

	Boolean isMemberReady;
	String memberProfileImageUrl;

	String hostName;
	String roomName;

	Integer currentParticipants;
	Integer totalParticipants;

	Boolean hasUnreadNotifications;

	static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

	@Builder
	public RoomSummaryDto(RoomMember roomMember, Member hostMember, Integer roomCurrentParticipants, Boolean hasUnreadNotifications, Integer totalParticipants) {
		Room room = roomMember.getRoom();
		this.roomId = room.getRoomId();
		this.isRoomInProgress = room.getRoomIsStarted();
		this.finishedAt = room.getRoomIsStarted() ? room.getRoomFinishDate().atTime(room.getRoomFinishTime()).format(formatter)  : null;
		this.isMemberReady = roomMember.getRoomMemberIsReady();
		this.memberProfileImageUrl = this.isMemberReady ? roomMember.getAnimal().getAnimalImageUrl() : roomMember.getMember().getMemberProfileImageUrl();
		this.hostName = hostMember.getMemberName();
		this.roomName = room.getRoomName();
		this.currentParticipants = roomCurrentParticipants;
		this.totalParticipants = totalParticipants;
		// 현재 알림이 존재하는지 확인
		this.hasUnreadNotifications = hasUnreadNotifications;
	}
}