package kr.co.ttoti.backend.domain.room.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.room.dto.RoomTemperatureDto;
import kr.co.ttoti.backend.domain.room.dto.RoomTemperatureListGetDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomTemperatureGetServiceImpl implements RoomTemperatureGetService {

	private final TtotiRepository ttotiRepository;
	private final Validator validator;

	@Override
	public RoomTemperatureListGetDto getRoomTemperatureList(Integer memberId, Integer roomId) {

		Member member = validator.validateMember(memberId);
		Room room = validator.validateRoom(roomId);
		validator.validateMemberRoomAuthorization(room, member);

		List<Integer> ttotiIdList = ttotiRepository.findByTtotiIdsByRoom(room);
		Pageable pageable = PageRequest.of(0, 1);

		List<RoomTemperatureDto> roomTemperatureDtoList = ttotiIdList.stream()
			.map(ttotiId -> ttotiRepository.findRoomTemperatureByTtotiId(ttotiId, pageable))
			.flatMap(page -> page.getContent().stream())
			.toList();

		return RoomTemperatureListGetDto.builder()
			.roomTemperatureDtoList(roomTemperatureDtoList)
			.build();
	}
}
