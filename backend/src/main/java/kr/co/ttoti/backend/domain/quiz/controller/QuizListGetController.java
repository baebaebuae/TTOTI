package kr.co.ttoti.backend.domain.quiz.controller;

import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryListGetDto;
import kr.co.ttoti.backend.domain.quiz.service.QuizHistoryListGetService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/ttotis")
public class QuizListGetController {

	private final QuizHistoryListGetService quizHistoryListGetService;

	@GetMapping("/{ttoti-id}/quiz")
	ResponseEntity<ResponseDto<QuizHistoryListGetDto>> getQuizList(@MemberId Integer memberId,
		@PathVariable("ttoti-id") Integer ttotiId) {

		QuizHistoryListGetDto result = quizHistoryListGetService.getQuizHistoryList(memberId, ttotiId);

		if (result == null) {
			throw new CustomException(ErrorCode.QUIZ_LIST_NOT_FOUND);
		}

		return ResponseEntity.ok(ResponseDto.success(
			SuccessCode.QUIZ_LIST_GET_SUCCESS, result));
	}
}
