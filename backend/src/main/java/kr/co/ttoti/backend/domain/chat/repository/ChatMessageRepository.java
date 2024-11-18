package kr.co.ttoti.backend.domain.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.chat.dto.MessageDto;
import kr.co.ttoti.backend.domain.chat.entity.ChatMessage;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

	List<ChatMessage> findByTtotiIdOrderByMessageSendAt(Integer totiId);

	@Query("SELECT COUNT(*) " +
			"FROM ChatMessage m " +
			"WHERE m.ttotiId = :ttotiId AND m.senderId = :memberId")
	Integer calculateSendMessage(@Param("ttotiId") Integer ttotiId, @Param("memberId") Integer memberId);
}
