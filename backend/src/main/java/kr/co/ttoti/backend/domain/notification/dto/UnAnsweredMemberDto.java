package kr.co.ttoti.backend.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UnAnsweredMemberDto {

	Integer memberId;
	Integer roomId;
	String roomName;
}
