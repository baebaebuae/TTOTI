package kr.co.ttoti.backend.domain.ttoti.repository;

import java.util.Optional;

import kr.co.ttoti.backend.domain.ttoti.entity.TtotiEnding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TtotiEndingRepository extends JpaRepository<TtotiEnding, Integer> {
    Optional<TtotiEnding> findByTtotiId(Integer ttotiId);
}
