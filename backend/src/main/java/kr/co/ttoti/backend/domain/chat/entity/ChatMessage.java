package kr.co.ttoti.backend.domain.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "message")
public class ChatMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "message_id")
	private Integer messageId;

	@NotNull
	@Column(name="ttoti_id")
	private Integer ttotiId;

	@NotNull
	@Column(name="sender_role")
	private String senderRole;

	@NotNull
	@Column(name="sender_id")
	private Integer senderId;

	@NotNull
	@Column(name="message_send_at")
	private LocalDateTime messageSendAt;

	@NotNull
	@Column(name = "message_content", length = 3000)
	private String messageContent;

	@Column(name = "message_original_content", length = 3000)
	private String messageOriginalContent;

	@Column(name = "message_similarity")
	private Double messageSimilarity;

	@NotNull
	@Column(name = "message_is_read")
	private Boolean messageIsRead;

	@Column(name = "message_read_at")
	private LocalDateTime messageReadAt;

}
