package kr.co.ttoti.backend.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomMemberPendingDto {

	String name;

	String profileImageUrl;

	Boolean isReady;

}