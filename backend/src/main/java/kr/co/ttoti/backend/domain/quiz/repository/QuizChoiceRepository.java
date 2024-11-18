package kr.co.ttoti.backend.domain.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.quiz.entity.QuizChoice;

@Repository
public interface QuizChoiceRepository extends JpaRepository<QuizChoice, Integer> {

	List<QuizChoice> findByQuizId(Integer quizId);
}
