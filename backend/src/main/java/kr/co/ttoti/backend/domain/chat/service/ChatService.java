package kr.co.ttoti.backend.domain.chat.service;

import java.util.List;

import kr.co.ttoti.backend.domain.chat.dto.MessageDto;

public interface ChatService {

	MessageDto sendMessageByManitto(Integer ttotiId, String message);

	MessageDto sendMessageByManiti(Integer ttotiId, String message);

	List<MessageDto> getMessageByManitto(Integer memberId, Integer ttotiId);

	List<MessageDto> getMessageByManiti(Integer memberId, Integer tittoId);
}
