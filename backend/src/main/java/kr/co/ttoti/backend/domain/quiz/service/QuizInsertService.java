package kr.co.ttoti.backend.domain.quiz.service;

import kr.co.ttoti.backend.domain.quiz.dto.QuizDto;

public interface QuizInsertService {

	/**
	 * 또띠들에게 낼 퀴즈를 랜덤으로 뽑는다.
	 * @param roomId
	 * @return
	 */
	QuizDto getRandomQuiz(Integer roomId);

	/**
	 * 방에 참여중인 모든 또띠들에게 랜덤 퀴즈를 하나 추가한다.
	 * @param roomId
	 */
	void insertQuiz(Integer roomId);
}
