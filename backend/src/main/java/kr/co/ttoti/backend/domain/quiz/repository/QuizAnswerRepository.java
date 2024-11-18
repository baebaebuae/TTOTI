package kr.co.ttoti.backend.domain.quiz.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;

@Repository
public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Integer> {

	List<QuizAnswer> findByTtotiIdOrderByQuizDateDesc(Integer ttotiId);

	List<QuizAnswer> findByRoomId(Integer roomId);

	QuizAnswer findByTtotiIdAndQuizDate(Integer ttotiId, LocalDate quizDate);

	Optional<QuizAnswer> findByTtotiIdAndQuiz(Integer ttotiId, Quiz quiz);

	List<QuizAnswer> findByRoomIdAndQuizDate(Integer roomId, LocalDate today);

	@Query("SELECT (CASE WHEN COUNT(*) > 0 THEN (SUM(CASE WHEN qa.quizAnswerIsCorrect = true THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) * 100 ELSE 0 END) " +
			"FROM QuizAnswer qa " +
			"WHERE qa.ttotiId = :ttotiId")
	Float calculateScore(@Param("ttotiId") Integer ttotiId);
}
