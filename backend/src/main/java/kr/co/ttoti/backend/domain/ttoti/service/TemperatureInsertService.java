package kr.co.ttoti.backend.domain.ttoti.service;

import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.ttoti.entity.Temperature;
import kr.co.ttoti.backend.domain.ttoti.entity.TemperatureChangeReason;

public interface TemperatureInsertService {

	/**
	 * 방 기간, 온도 변화 사유에 따른 변화량을 계싼하고 Temperature 테이블에 저장한다.
	 * @param ttotiId
	 * @param prevTemperature
	 * @param temperatureChangeReason
	 * @param roomPeriod
	 * @return
	 */
	Temperature calculateTemperatureIncrease(Integer ttotiId, Float prevTemperature,
		TemperatureChangeReason temperatureChangeReason, int roomPeriod);

	void insertTemperatureForQuizAnswer(QuizAnswer quizAnswer, Integer roomPeriod);

	void insertInitTemperature(Integer ttotiId);
}
