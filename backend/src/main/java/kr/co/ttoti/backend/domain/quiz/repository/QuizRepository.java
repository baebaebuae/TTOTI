package kr.co.ttoti.backend.domain.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.quiz.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

	List<Quiz> findByQuizIdNotIn(List<Integer> answeredQuizIdList);

	List<Quiz> findByQuizIsAvailable(Boolean quizIsvailable);

	Optional<Quiz> findByQuizIdAndQuizIsAvailable(Integer quizId, Boolean quizIsvailable);
}
