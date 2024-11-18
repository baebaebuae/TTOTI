package kr.co.ttoti.backend.domain.room.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomPendingDto {

	String hostName;

	String roomName;

	String roomCode;

	RoomMemberListPendingDto roomMemberInfo;

	String profileImageUrl;

	Boolean isReady;

	String animalProfileImageUrl;
}
