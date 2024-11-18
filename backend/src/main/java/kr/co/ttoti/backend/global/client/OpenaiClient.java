package kr.co.ttoti.backend.global.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import kr.co.ttoti.backend.domain.chat.dto.OpenaiRequest;
import kr.co.ttoti.backend.domain.chat.dto.OpenaiResponse;

@FeignClient(name = "openaiClient", url = "https://api.openai.com/v1/chat/completions")
public interface OpenaiClient {

	@PostMapping(produces = "application/json")
	OpenaiResponse getPrompt(@RequestHeader("Authorization") String openaiApiKey,
		@RequestBody OpenaiRequest modelAndMessages);
}
