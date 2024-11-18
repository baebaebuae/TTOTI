package kr.co.ttoti.backend.global.redis.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash(value = "logout")
@Getter
@Builder
public class LogoutToken {

    @Id
    private final String accessToken;

    @TimeToLive
    private final Long expiresIn;

}
