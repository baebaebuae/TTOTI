package kr.co.ttoti.backend.domain.quiz.service;

import kr.co.ttoti.backend.domain.quiz.dto.QuizAnswerUpdateRequest;

public interface QuizAnswerUpdateService {

	void updateManitiQuizAnswer(Integer memberId, Integer tittoId, Integer quizId,
		QuizAnswerUpdateRequest quizAnswerUpdateRequest);

	void updateManittoQuizAnswer(Integer memberId, Integer ttotiId, Integer quizId,
		QuizAnswerUpdateRequest quizAnswerUpdateRequest);
}
