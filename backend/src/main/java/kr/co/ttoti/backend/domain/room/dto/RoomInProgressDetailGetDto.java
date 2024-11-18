package kr.co.ttoti.backend.domain.room.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomInProgressDetailGetDto {

	private String roomName;
	private String roomHostMemberName;
	private Integer roomParticipants;
	private List<String> roomParticipantsNameList;
	private String roomFinishTime;
	private LocalDate roomStartDate;
	private LocalDate roomFinishDate;
	private Integer roomPeriod;
}
