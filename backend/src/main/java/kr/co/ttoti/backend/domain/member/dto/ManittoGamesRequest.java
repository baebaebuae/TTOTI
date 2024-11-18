package kr.co.ttoti.backend.domain.member.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ManittoGamesRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private String friendId;
}
