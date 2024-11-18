package kr.co.ttoti.backend.domain.quiz.service;

import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryListGetDto;

public interface QuizHistoryListGetService {

	/**
	 * 어제까지의 마니또 퀴즈 응답 내역 리스트,
	 * 마니띠 퀴즈 응답 내역 리스트,
	 * 오늘의 마니또 퀴즈,
	 * 오늘의 마니띠 퀴즈를 가져온다.
	 * @param memberId
	 * @param ttotiId
	 * @return
	 */
	QuizHistoryListGetDto getQuizHistoryList(Integer memberId, Integer ttotiId);
}
