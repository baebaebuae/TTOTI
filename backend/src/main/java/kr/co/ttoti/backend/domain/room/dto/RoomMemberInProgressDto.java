package kr.co.ttoti.backend.domain.room.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomMemberInProgressDto {

    private String roomMemberProfileImageUrl;

    private String roomMemberName;

    private Integer roomMemberId;
}
