package kr.co.ttoti.backend.domain.quiz.service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryDto;
import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryListGetDto;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.quiz.service.common.QuizServiceUtils;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class QuizHistoryListGetServiceImpl implements QuizHistoryListGetService {

	private final QuizAnswerRepository quizAnswerRepository;
	private final QuizServiceUtils quizServiceUtils;
	private final Validator validator;

	private QuizHistoryDto extractTodayQuiz(List<QuizHistoryDto> quizHistoryDtoList, Boolean isManitto) {

		QuizHistoryDto todayQuiz = quizHistoryDtoList.getFirst();
		if (!todayQuiz.getQuizDate().isBefore(LocalDate.now())) {
			todayQuiz = quizHistoryDtoList.removeFirst();
			return QuizHistoryDto.builder()
				.ttotiId(todayQuiz.getTtotiId())
				.quizId(todayQuiz.getQuizId())
				.quizDate(todayQuiz.getQuizDate())
				.quizChoiceContent(todayQuiz.getQuizChoiceContent())
				.quizType(todayQuiz.getQuizType())
				.quizChoiceMap(todayQuiz.getQuizChoiceMap())
				.isManittoAnswered(todayQuiz.getIsManittoAnswered())
				.manittoAnswer(isManitto ? todayQuiz.getManittoAnswer() : null)
				.isManitiAnswered(todayQuiz.getIsManitiAnswered())
				.manitiAnswer(isManitto ? null : todayQuiz.getManitiAnswer())
				.quizAnswerIsCorrect(null)
				.build();
		}
		return null;
	}

	@Override
	public QuizHistoryListGetDto getQuizHistoryList(Integer memberId, Integer ttotiId) {

		validator.validateMember(memberId);
		Ttoti ttoti = validator.validateTtoti(ttotiId);
		Ttoti titto = validator.validateTtoti(ttoti.getTittoId());

		List<QuizAnswer> manittoQuizAnswerList = quizAnswerRepository.findByTtotiIdOrderByQuizDateDesc(ttotiId);
		List<QuizAnswer> manitiQuizAnswerList = quizAnswerRepository.findByTtotiIdOrderByQuizDateDesc(
			titto.getTtotiId());

		if (manittoQuizAnswerList.isEmpty() || manitiQuizAnswerList.isEmpty()) {
			throw new CustomException(ErrorCode.QUIZ_LIST_NOT_FOUND);
		}

		List<QuizHistoryDto> manittoQuizHistoryDtoList = new LinkedList<>(manittoQuizAnswerList.stream()
			.map(quizServiceUtils::mapToQuizHistoryDto)
			.toList());
		List<QuizHistoryDto> manitiQuizHistoryDtoList = new LinkedList<>(manitiQuizAnswerList.stream()
			.map(quizServiceUtils::mapToQuizHistoryDto)
			.toList());

		QuizHistoryDto todayManittoQuiz = extractTodayQuiz(manittoQuizHistoryDtoList, true);
		QuizHistoryDto todayManitiQuiz = extractTodayQuiz(manitiQuizHistoryDtoList, false);

		return QuizHistoryListGetDto.builder()
			.manittoQuizList(manittoQuizHistoryDtoList)
			.manitiQuizList(manitiQuizHistoryDtoList)
			.todayManittoQuiz(todayManittoQuiz)
			.todayManitiQuiz(todayManitiQuiz)
			.build();
	}
}
