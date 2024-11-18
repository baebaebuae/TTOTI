package kr.co.ttoti.backend.domain.quiz.service.common;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryDto;
import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.quiz.entity.QuizChoice;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.quiz.repository.QuizChoiceRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuizServiceUtils {

	private final QuizChoiceRepository quizChoiceRepository;
	private final QuizAnswerRepository quizAnswerRepository;

	public QuizHistoryDto mapToQuizHistoryDto(QuizAnswer quizAnswer) {
		Map<Integer, String> quizChoiceMap = quizChoiceRepository.findByQuizId(
			quizAnswer.getQuiz().getQuizId()).stream().collect(
			Collectors.toMap(
				QuizChoice::getQuizChoiceNumber,
				QuizChoice::getQuizChoiceContent));

		Quiz quiz = quizAnswer.getQuiz();

		return QuizHistoryDto.builder()
			.ttotiId(quizAnswer.getTtotiId())
			.quizId(quiz.getQuizId())
			.quizDate(quizAnswer.getQuizDate())
			.quizChoiceMap(quizChoiceMap)
			.quizChoiceContent(quiz.getQuizContent())
			.quizType(quiz.getQuizType().toString())
			.isManittoAnswered(quizAnswer.getIsManittoAnswered())
			.manittoAnswer(quizAnswer.getManittoAnswer())
			.isManitiAnswered(quizAnswer.getIsManitiAnswered())
			.manitiAnswer(quizAnswer.getManitiAnswer())
			.quizAnswerIsCorrect(quizAnswer.getQuizAnswerIsCorrect())
			.build();
	}

	public List<QuizAnswer> getTodayQuizAnswer(Integer roomId){
		return quizAnswerRepository.findByRoomIdAndQuizDate(roomId, LocalDate.now());
	}
}
