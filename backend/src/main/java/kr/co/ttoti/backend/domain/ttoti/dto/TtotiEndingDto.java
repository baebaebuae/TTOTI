package kr.co.ttoti.backend.domain.ttoti.dto;

import kr.co.ttoti.backend.domain.guess.dto.GuessEndingResponse;
import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryDto;
import kr.co.ttoti.backend.domain.room.document.RoomEnding;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TtotiEndingDto {

	// 방 정보
	private RoomEnding roomEnding;

	// 내 퀴즈 결과
	private List<QuizHistoryDto> manittoQuizList;
	private List<QuizHistoryDto> manitiQuizList;

	// 내 마니띠의 추측 결과
	private GuessEndingResponse midGuess;
	private GuessEndingResponse finalGuess;

	// 마니또 마니띠 내 데이터 결산
	private Float endingCorrectScore;
	private Integer endingChatCount;
	private Float endingFinalTemperature;
}
