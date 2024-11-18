package kr.co.ttoti.backend.domain.notification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notification")
public class Notification extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notification_id")
	private Integer notificationId;

	@NotNull
	@Column(name = "member_id")
	private Integer memberId;

	@NotNull
	@Column(name = "room_id")
	private Integer roomId;

	@NotNull
	@Column(name = "notification_title")
	private String notificationTitle;

	@NotNull
	@Column(name="notification_reason")
	private String notificationReason;

	@NotNull
	@Column(name="notification_is_read")
	private Boolean notificationIsRead;

	public void updateIsRead(){
		if(!notificationIsRead){
			this.notificationIsRead = true;
		}
	}
}
