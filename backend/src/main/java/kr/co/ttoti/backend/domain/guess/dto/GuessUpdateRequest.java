package kr.co.ttoti.backend.domain.guess.dto;

import lombok.Data;

@Data
public class GuessUpdateRequest {

    Integer roomId;

    Integer roomMemberId;
}
