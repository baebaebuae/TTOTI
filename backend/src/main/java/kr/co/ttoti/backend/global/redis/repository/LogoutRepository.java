package kr.co.ttoti.backend.global.redis.repository;

import kr.co.ttoti.backend.global.redis.entity.LogoutToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogoutRepository extends CrudRepository<LogoutToken, String> {
}
