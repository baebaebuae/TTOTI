package kr.co.ttoti.backend.domain.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.chat.dto.ChatMessageRequest;
import kr.co.ttoti.backend.domain.chat.dto.MessageDto;
import kr.co.ttoti.backend.domain.chat.service.ChatService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/chats")
public class ChatController {

	private final ChatService chatService;

	// /pub 생략
	@MessageMapping("/manitto/{ttoti-id}")
	@SendTo("/sub/sub-{ttoti-id}")
	public MessageDto sendMessageByManitto(@DestinationVariable("ttoti-id") Integer ttotiId,
		@Payload ChatMessageRequest chatMessageRequest) throws Exception {
		return chatService.sendMessageByManitto(
			ttotiId, chatMessageRequest.getMessage());
	}

	// /pub 생략
	@MessageMapping("/maniti/{titto-id}")
	@SendTo("/sub/sub-{titto-id}")
	public MessageDto sendMessageByManiti(@DestinationVariable("titto-id") Integer tittoId,
		@Payload ChatMessageRequest chatMessageRequest) {
		return chatService.sendMessageByManiti(
			tittoId, chatMessageRequest.getMessage());
	}

	@GetMapping("/manitto/{ttoti-id}")
	public ResponseEntity<ResponseDto<List<MessageDto>>> getMessagesByManitto(@MemberId Integer memberId,
		@PathVariable("ttoti-id") Integer ttotiId) {
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK, chatService.getMessageByManitto(memberId, ttotiId)));
	}

	@GetMapping("/maniti/{titto-id}")
	public ResponseEntity<ResponseDto<List<MessageDto>>> getMessagesByManiti(@MemberId Integer memberId,
		@PathVariable("titto-id") Integer tittoId) {
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK, chatService.getMessageByManiti(memberId, tittoId)));
	}
}
