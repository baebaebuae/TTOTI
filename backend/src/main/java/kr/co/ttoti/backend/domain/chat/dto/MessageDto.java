package kr.co.ttoti.backend.domain.chat.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {

	String role;

	LocalDateTime sendTime;

	String message;
}
