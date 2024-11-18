package kr.co.ttoti.backend.domain.room.common;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import kr.co.ttoti.backend.domain.room.document.RoomEnding;
import kr.co.ttoti.backend.domain.room.mongo.repository.RoomEndingRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.entity.TtotiEnding;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiEndingRepository;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoomServiceUtils {

	private final MemberRepository memberRepository;
	private final RoomRepository roomRepository;
	private final TtotiRepository ttotiRepository;
	private final RoomEndingRepository roomEndingRepository;
	private final TtotiEndingRepository ttotiEndingRepository;

	public List<Room> getInProgressRoomList(){
		return roomRepository.findByRoomIsDeletedFalseAndRoomIsStartedTrueAndRoomIsFinishedFalse();
	}

	public List<Room> getInProgressRoomListByFinishDateAndTime() {
		return roomRepository.findInProgressRooms(LocalDate.now(), LocalTime.now());
	}

	@Transactional
	public void finishInProgressRooms(Room room){
		room.finishRoom();
	}

	@Transactional
	public void calculateRoomEnding(Room room) {

		List<Ttoti> ttotiList = ttotiRepository.findByRoom(room);
		List<TtotiEnding> ttotiEndingList = new ArrayList<>();
		List<RoomEnding.ttotiPair> ttotiPairList = new ArrayList<>();

		for (Ttoti ttoti : ttotiList) {
			Member maniti = memberRepository.findByMemberId(ttoti.getManitiId()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
			ttotiPairList.add(RoomEnding.ttotiPair.builder()
					.manitto(MemberDetailDto.builder()
							.memberId(ttoti.getMember().getMemberUuid())
							.memberName(ttoti.getMember().getMemberName())
							.memberProfileImageUrl(ttoti.getMember().getMemberProfileImageUrl())
							.build())
					.maniti(MemberDetailDto.builder()
							.memberId(maniti.getMemberUuid())
							.memberName(maniti.getMemberName())
							.memberProfileImageUrl(maniti.getMemberProfileImageUrl())
							.build())
					.build());
			ttotiEndingList.add(ttotiEndingRepository.findByTtotiId(ttoti.getTtotiId()).orElseThrow(() -> new CustomException(ErrorCode.TTOTI_ENDING_NOT_FOUND)));
		}

		float maxTtotiCorrectScore = 0.0F;
		int maxChatCount = 0;
		float maxFinalTemperature = 0.0F;
		for (TtotiEnding ttotiEnding : ttotiEndingList) {
			maxTtotiCorrectScore = Math.max(maxTtotiCorrectScore, ttotiEnding.getEndingCorrectScore());
			maxChatCount = Math.max(maxChatCount, ttotiEnding.getEndingChatCount());
			maxFinalTemperature = Math.max(maxFinalTemperature, ttotiEnding.getEndingFinalTemperature());
		}

		roomEndingRepository.save(RoomEnding.builder()
						.id(room.getRoomId())
						.roomName(room.getRoomName())
						.roomParticipants(room.getRoomParticipants())
						.roomStartTime(room.getRoomStartTime())
						.roomStartDate(room.getRoomStartDate())
						.roomFinishTime(room.getRoomFinishTime())
						.roomFinishDate(room.getRoomFinishDate())
						.ttotiList(ttotiPairList)
						.bestCorrectScore(maxTtotiCorrectScore)
						.bestCorrectMemberList(ttotiRepository.getBestCorrectMemberList(room.getRoomId(), maxTtotiCorrectScore - 0.0001f, maxTtotiCorrectScore + 0.0001f))
						.bestChatCount(maxChatCount)
						.bestChatMemberList(ttotiRepository.getBestChatMemberList(room.getRoomId(), maxChatCount))
						.bestFinalTemperature(maxFinalTemperature)
						.bestTemperatureMemberList(ttotiRepository.getBestTemperatureMemberList(room.getRoomId(), maxFinalTemperature - 0.0001f, maxFinalTemperature + 0.0001f))
				.build());
	}
}
