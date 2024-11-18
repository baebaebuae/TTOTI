package kr.co.ttoti.backend.domain.chat.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class ConvertToAnimalSpeakResponse {

	@Data
	public static class Message {
		String role;
		String content;
		String refusal;
	}

	@Data
	public static class Choice {
		Integer index;
		Message message;
		List<Object> logProbs;
		String finish_reason;
	}

	String id;
	String object;
	Integer created;
	String model;
	List<Choice> choices;
    List<Map<String, Object>> usage;
	String system_fingerprint;
}
