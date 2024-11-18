package kr.co.ttoti.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.redis.core.RedisKeyValueAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableFeignClients
@EnableJpaAuditing
@EnableMongoRepositories(basePackages = "kr.co.ttoti.backend.domain.room.mongo.repository")
@EnableRedisRepositories(basePackages = "kr.co.ttoti.backend.global.redis.repository",
        enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
@EnableJpaRepositories(
        basePackages = "kr.co.ttoti.backend",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASPECTJ, pattern = {
                "kr.co.ttoti.backend.global.redis.repository.*",
                "kr.co.ttoti.backend.domain.room.mongo.repository.*"
        }
        )
)
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
