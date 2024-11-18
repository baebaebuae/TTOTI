package kr.co.ttoti.backend.domain.room.dto;

import kr.co.ttoti.backend.domain.guess.dto.GuessInfoDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomInProgressDto {

	private String roomHostMemberName;
	private String roomName;
	private TtotiMatchDto ttotiMatchInfo;

	private Boolean canGuess;
	private GuessInfoDto guessInfoDto;
}
