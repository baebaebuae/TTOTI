package kr.co.ttoti.backend.domain.ttoti.entity;

import java.util.Arrays;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TemperatureChangeReason {

	INIT(0),
	CHAT(1),
	QUIZ_ANSWER(1),
	QUIZ_ANSWER_CORRECT(1),
	GUESS_ANSWER(1),
	GUESS_ANSWER_CORRECT(1),

	;

	private final Integer weight;

	public static float calculateTotalWeight() {
		return Arrays.stream(TemperatureChangeReason.values())
			.mapToInt(TemperatureChangeReason::getWeight)
			.sum();
	}

}