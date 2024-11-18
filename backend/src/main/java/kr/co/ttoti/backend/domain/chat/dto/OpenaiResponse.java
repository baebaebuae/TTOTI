package kr.co.ttoti.backend.domain.chat.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OpenaiResponse {

	@Data
	public static class Message {
		private String role;
		private String content;
		private Object refusal;
	}

	@Data
	public static class Choice {
		private Integer index;
		private Message message;
		private Object logprobs;
		@JsonProperty("finish_reason")
		private String finishReason;
	}

	private String id;
	private String object;
	private Integer created;
	private String model;
	private List<Choice> choices;
	private Map<String, Object> usage;
	@JsonProperty("system_fingerprint")
	private String systemFingerprint;
}
