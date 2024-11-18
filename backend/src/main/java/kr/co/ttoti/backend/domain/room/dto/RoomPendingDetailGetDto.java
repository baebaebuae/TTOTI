package kr.co.ttoti.backend.domain.room.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomPendingDetailGetDto {

	private String roomName;
	private String roomHostMemberName;
	private String roomFinishTime;
	private Integer roomPeriod;
	private Integer roomCurrentParticipants;
	private Integer roomTotalParticipants;
	private Boolean isHost;
}
