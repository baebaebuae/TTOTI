package kr.co.ttoti.backend.domain.ttoti.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "temperature")
public class Temperature extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "temperature_id")
	private Integer temperatureId;

	@Column(name = "ttoti_id")
	private Integer ttotiId;

	@Column(name = "temperature_difference")
	private Float temperatureDifference;

	@Enumerated(EnumType.STRING)
	@Column(name = "temperature_change_reason")
	private TemperatureChangeReason temperatureChangeReason;

	@Column(name = "current_temperature")
	private Float currentTemperature;

}