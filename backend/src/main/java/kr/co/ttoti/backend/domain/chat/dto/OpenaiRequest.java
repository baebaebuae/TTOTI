package kr.co.ttoti.backend.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OpenaiRequest {

    @Data
    @Builder
    public static class Message {
        private String role;
        private String content;
    }

    private String model;
    @JsonProperty("messages")
    private List<Message> messages;
}

