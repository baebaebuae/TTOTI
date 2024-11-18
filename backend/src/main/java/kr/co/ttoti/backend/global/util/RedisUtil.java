package kr.co.ttoti.backend.global.util;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.global.fcm.dto.FCMDeviceTokenCreateRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class RedisUtil {

	private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	private final RedisTemplate<String, String> redisTemplate;
	private final Validator validator;

	private final String redisRoomLinkKey = "room_link:";
	private final Long redisRoomLinkPeriod = 3L;

	private final String redisFCMTokenKey = "fcm_token:";
	private final Long redisFCMTokenPeriod = 60L;

	public void setData(String key, String value, Long expiredTime) {
		redisTemplate.opsForValue().set(key, value, expiredTime, TimeUnit.MILLISECONDS);
	}

	public String getData(String key) {
		Object value = redisTemplate.opsForValue().get(key);
		return value != null ? value.toString() : null;  // 반환값을 String으로 변환
	}

	public void deleteData(String key) {
		redisTemplate.delete(key);
	}

	// 방 초대링크 관련
	private String createRoomLink(Room room) {
		return bCryptPasswordEncoder.encode(room.getRoomId().toString() + room.getCreatedAt());
	}

	public String getRoomLink(Room room) {
		String roomLinkKey = redisRoomLinkKey + room.getRoomId().toString();
		String roomLinkValue = redisTemplate.opsForValue().get(roomLinkKey);
		System.out.println(roomLinkKey + " : " + roomLinkValue);
		return roomLinkValue != null ? roomLinkValue.toString() : null;  // 반환값을 String으로 변환
	}

	public void setRoomLink(Room room) {
		String roomLinkKey = redisRoomLinkKey + room.getRoomId().toString();
		String roomLinkValue = createRoomLink(room);
		System.out.println(roomLinkKey + " : " + roomLinkValue);
		redisTemplate.opsForValue().set(roomLinkKey, roomLinkValue, redisRoomLinkPeriod, TimeUnit.DAYS);
	}

	public void setDeviceToken(FCMDeviceTokenCreateRequest fcmDeviceTokenCreateRequest, Integer memberId) {
		validator.validateMember(memberId);
		String fcmTokenKey = redisFCMTokenKey + memberId.toString();

		redisTemplate.opsForValue()
			.set(fcmTokenKey, fcmDeviceTokenCreateRequest.getDeviceToken(), redisFCMTokenPeriod, TimeUnit.DAYS);
	}

}
