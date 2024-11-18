package kr.co.ttoti.backend.domain.guess.dto;

import kr.co.ttoti.backend.domain.room.dto.RoomMemberInProgressDto;
import kr.co.ttoti.backend.domain.ttoti.dto.MyManittoDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GuessInfoDto {

    private MyManittoDto myManitto;

    private List<RoomMemberInProgressDto> roomMemberList;
}
