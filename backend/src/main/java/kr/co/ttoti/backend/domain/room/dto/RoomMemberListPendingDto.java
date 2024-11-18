package kr.co.ttoti.backend.domain.room.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMemberListPendingDto {

	int currentParticipants;

	int totalParticipants;

	List<RoomMemberPendingDto> roomMemberList;
}
