package kr.co.ttoti.backend.domain.ttoti.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.ttoti.entity.Temperature;
import kr.co.ttoti.backend.domain.ttoti.entity.TemperatureChangeReason;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TemperatureRepository;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TemperatureInsertServiceImpl implements TemperatureInsertService {

	private static final Float INITIAL_TEMPERATURE = 36.5F;
	private static final Float MAX_TEMPERATURE = 100F;

	private final TemperatureRepository temperatureRepository;
	private final TtotiRepository ttotiRepository;
	private final Validator validator;

	@Override
	public Temperature calculateTemperatureIncrease(Integer ttotiId, Float prevTemperature,
		TemperatureChangeReason temperatureChangeReason, int roomPeriod) {

		float totalWeight = TemperatureChangeReason.calculateTotalWeight();
		Float increase = (MAX_TEMPERATURE - INITIAL_TEMPERATURE) *
			(temperatureChangeReason.getWeight() / totalWeight) / roomPeriod;

		increase = Math.round(increase * 10) / 10.0f;

		Float currentTemperature = Math.min(prevTemperature + increase, MAX_TEMPERATURE);

		Ttoti ttoti = validator.validateTtoti(ttotiId);
		ttoti.updateTtotiTemperature(currentTemperature);

		return temperatureRepository.save(
			Temperature.builder()
				.ttotiId(ttotiId)
				.temperatureDifference(increase)
				.temperatureChangeReason(temperatureChangeReason)
				.currentTemperature(currentTemperature)
				.build()
		);
	}

	@Transactional
	public void insertTemperatureForQuizAnswer(QuizAnswer quizAnswer, Integer roomPeriod) {

		Ttoti ttoti = ttotiRepository.findByTtotiId(quizAnswer.getTtotiId());

		if (quizAnswer.getIsManittoAnswered()) {
			calculateTemperatureIncrease(quizAnswer.getTtotiId(), ttoti.getTtotiTemperature(),
				TemperatureChangeReason.QUIZ_ANSWER, roomPeriod);
		}

		if (quizAnswer.getManittoAnswer() != null && quizAnswer.getManittoAnswer()
			.equals(quizAnswer.getManitiAnswer())) {
			calculateTemperatureIncrease(quizAnswer.getTtotiId(), ttoti.getTtotiTemperature(),
				TemperatureChangeReason.QUIZ_ANSWER_CORRECT, roomPeriod);
		}
	}

	@Override
	public void insertInitTemperature(Integer ttotiId) {

		temperatureRepository.save(Temperature.builder()
				.ttotiId(ttotiId)
				.temperatureDifference(0F)
				.temperatureChangeReason(TemperatureChangeReason.INIT)
				.currentTemperature(INITIAL_TEMPERATURE)
			.build());
	}
}
