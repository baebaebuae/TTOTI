package kr.co.ttoti.backend.domain.quiz.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.quiz.dto.QuizAnswerUpdateRequest;
import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizAnswerUpdateServiceImpl implements QuizAnswerUpdateService {

	private final Validator validator;

	@Override
	@Transactional
	public void updateManitiQuizAnswer(Integer memberId, Integer tittoId, Integer quizId,
		QuizAnswerUpdateRequest quizAnswerUpdateRequest) {

		validator.validateMember(memberId);
		validator.validateTtoti(tittoId);
		Quiz quiz = validator.validateQuizAvailability(quizId, true);
		Integer quizAnswerNumber = quizAnswerUpdateRequest.getQuizAnswerNumber();

		QuizAnswer manitiQuizAnswer = validator.validateQuizAnswerByTtotiIdAndQuiz(tittoId, quiz);

		if (manitiQuizAnswer.getQuizDate().isBefore(LocalDate.now())) {
			System.out.println(ErrorCode.QUIZ_EXPIRED.getMessage());
		}

		manitiQuizAnswer.updateManitiQuizAnswer(quizAnswerNumber);

		checkAnswerIsCorrect(manitiQuizAnswer);
	}

	@Override
	@Transactional
	public void updateManittoQuizAnswer(Integer memberId, Integer ttotiId, Integer quizId,
		QuizAnswerUpdateRequest quizAnswerUpdateRequest) {

		Member member = validator.validateMember(memberId);
		validator.validateManittoByTtotiIdAndMember(ttotiId, member);
		Quiz quiz = validator.validateQuizAvailability(quizId, true);
		Integer quizAnswerNumber = quizAnswerUpdateRequest.getQuizAnswerNumber();

		QuizAnswer manittoQuizAnswer = validator.validateQuizAnswerByTtotiIdAndQuiz(ttotiId, quiz);

		if (manittoQuizAnswer.getQuizDate().isBefore(LocalDate.now())) {
			System.out.println(ErrorCode.QUIZ_EXPIRED.getMessage());
		}

		manittoQuizAnswer.updateManittoQuizAnswer(quizAnswerNumber);

		checkAnswerIsCorrect(manittoQuizAnswer);
	}

	private void checkAnswerIsCorrect(QuizAnswer quizAnswer) {

		Integer manittoAnswerNumber = quizAnswer.getManittoAnswer();
		Integer manitiAnswerNumber = quizAnswer.getManitiAnswer();

		quizAnswer.updateQuizAnswerIsCorrect(manittoAnswerNumber != null && manittoAnswerNumber.equals(
			manitiAnswerNumber));
	}
}