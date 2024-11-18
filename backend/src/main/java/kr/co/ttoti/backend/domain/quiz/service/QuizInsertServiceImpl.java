package kr.co.ttoti.backend.domain.quiz.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.quiz.dto.QuizDto;
import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.quiz.repository.QuizRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizInsertServiceImpl implements QuizInsertService {

	private final QuizRepository quizRepository;
	private final QuizAnswerRepository quizAnswerRepository;
	private final Validator validator;
	private final TtotiRepository ttotiRepository;

	public QuizDto getRandomQuiz(Integer roomId) {

		List<Integer> answeredQuizIdList = quizAnswerRepository.findByRoomId(roomId).stream()
			.map(quizAnswer -> quizAnswer.getQuiz().getQuizId())
			.toList();

		if (answeredQuizIdList.isEmpty()) {
			return getRandomQuizFromList(quizRepository.findByQuizIsAvailable(true));
		}

		List<Quiz> unAnsweredQuizList = quizRepository.findByQuizIdNotIn(answeredQuizIdList);
		if (unAnsweredQuizList.isEmpty()) {
			// throw new CustomException(ErrorCode.UNANSWERED_QUIZ_NOT_FOUND);
			// 나중에 퀴즈 데이터 다 추가하면 그때 예외처리로 바꾸겠음
			System.out.println(roomId + ErrorCode.UNANSWERED_QUIZ_NOT_FOUND.getMessage());
		}

		return getRandomQuizFromList(unAnsweredQuizList);
	}

	private QuizDto getRandomQuizFromList(List<Quiz> quizList) {
		if(quizList.isEmpty()){
			System.out.println(ErrorCode.UNANSWERED_QUIZ_NOT_FOUND.getMessage());
			return null;
		}

		Quiz quiz = quizList.get(new java.util.Random().nextInt(quizList.size()));

		return quiz.toDto();
	}

	@Transactional
	public void insertQuiz(Integer roomId) {

		Room room = validator.validateRoom(roomId);

		QuizDto quizDto = getRandomQuiz(roomId);
		List<Ttoti> ttotiList = ttotiRepository.findByRoom(room);

		for (Ttoti ttoti : ttotiList) {
			quizAnswerRepository.save(QuizAnswer.builder()
				.ttotiId(ttoti.getTtotiId())
				.roomId(roomId)
				.quiz(quizDto.toEntity())
				.isManittoAnswered(false)
				.isManitiAnswered(false)
				.quizDate(LocalDate.now())
				.quizAnswerIsCorrect(false)
				.build());
		}
	}
}
