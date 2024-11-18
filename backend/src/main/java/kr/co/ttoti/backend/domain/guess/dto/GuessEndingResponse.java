package kr.co.ttoti.backend.domain.guess.dto;

import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GuessEndingResponse {
    private MemberDetailDto guessMember;
    private Boolean guessIsCorrect;
    private Boolean guessIsFinal;
    private LocalDate guessDate;
    private Boolean guessIsAnswered;
    private LocalDateTime guessAnswerAt;
}
