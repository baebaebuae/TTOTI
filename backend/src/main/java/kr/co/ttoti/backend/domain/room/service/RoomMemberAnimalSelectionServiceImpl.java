package kr.co.ttoti.backend.domain.room.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ttoti.backend.domain.animal.dto.AnimalDto;
import kr.co.ttoti.backend.domain.animal.dto.AnimalSelectDto;
import kr.co.ttoti.backend.domain.animal.entity.Animal;
import kr.co.ttoti.backend.domain.common.Validator;
import kr.co.ttoti.backend.domain.guess.service.GuessCreateService;
import kr.co.ttoti.backend.domain.notification.entity.NotificationType;
import kr.co.ttoti.backend.domain.notification.service.NotificationInsertService;
import kr.co.ttoti.backend.domain.quiz.dto.QuizHistoryDto;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.quiz.service.QuizInsertService;
import kr.co.ttoti.backend.domain.quiz.service.common.QuizServiceUtils;
import kr.co.ttoti.backend.domain.room.dto.RoomMemberAnimalSelectRequest;
import kr.co.ttoti.backend.domain.room.dto.RoomStartDto;
import kr.co.ttoti.backend.domain.room.dto.TtotiMatchDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.AnimalPersonality;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.domain.ttoti.service.TemperatureInsertService;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.fcm.service.FCMSendService;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomMemberAnimalSelectionServiceImpl implements RoomMemberAnimalSelectionService {

	private final Validator validator;

	private final RoomMemberRepository roomMemberRepository;
	private final TtotiRepository ttotiRepository;
	private final QuizInsertService quizInsertService;
	private final NotificationInsertService notificationInsertService;
	private final GuessCreateService guessService;
	private final TemperatureInsertService temperatureInsertService;

	private final QuizServiceUtils quizServiceUtils;
	private final QuizAnswerRepository quizAnswerRepository;
	private final FCMSendService fcmSendService;

	@Transactional
	public Integer createTtoti(Room room, List<RoomMember> roomMemberList, RoomMember roomMember) {

		List<RoomMember> shuffledRoomMemberList = new ArrayList<>(roomMemberList);
		Collections.shuffle(shuffledRoomMemberList);
		Integer myTtotiId = null;

		for (int i = 0; i < shuffledRoomMemberList.size(); i++) {
			RoomMember manitto = shuffledRoomMemberList.get(i);
			RoomMember maniti = shuffledRoomMemberList.get((i + 1) % shuffledRoomMemberList.size());

			Ttoti ttoti = Ttoti.builder()
				.room(room)
				.member(manitto.getMember())
				.animal(manitto.getAnimal())
				.manitiId(maniti.getMember().getMemberId())
				.ttotiAnimalName(AnimalPersonality.getRandomPersonality().getDescription() + " " + manitto.getAnimal()
					.getAnimalName())
				.ttotiTemperature(36.5F)
				.ttotiChatIsFinished(false)
				.build();
			Ttoti savedTtoti = ttotiRepository.save(ttoti);

			if (manitto.equals(roomMember)) {
				myTtotiId = savedTtoti.getTtotiId();
			}

			guessService.insertGuess(maniti, room, manitto.getMember().getMemberId());
		}

		List<Ttoti> ttotiList = ttotiRepository.findByRoom(room);
		for (Ttoti ttoti : ttotiList) {
			Ttoti titto = ttotiRepository.findByRoomAndManitiId(room, ttoti.getMember().getMemberId());
			ttoti.updateTittoId(titto.getTtotiId());
			temperatureInsertService.insertInitTemperature(ttoti.getTtotiId());
		}
		return myTtotiId;
	}

	@Transactional
	public AnimalDto updateRoomMemberAnimal(Room room, Member member,
		RoomMemberAnimalSelectRequest roomMemberAnimalSelectRequest) {

		RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);

		Animal animal = validator.validateAnimal(roomMemberAnimalSelectRequest.getAnimalId());

		roomMember.updateAnimal(animal);
		roomMember.updateRoomMemberIsReady(true);

		return animal.toDto();
	}

	@Transactional
	public RoomStartDto startRoom(Room room, List<RoomMember> readyRoomMemberList, RoomMember roomMember,
		Member member) {

		room.startRoom();

		Integer myTtotiId = createTtoti(room, readyRoomMemberList, roomMember);

		Ttoti ttoti = validator.validateTtoti(myTtotiId);
		Member myManiti = validator.validateMember(ttoti.getManitiId());
		Ttoti titto = validator.validateTtoti(ttoti.getTittoId());

		quizInsertService.insertQuiz(room.getRoomId());

		TtotiMatchDto ttotiMatchDto = TtotiMatchDto.builder()
			.myTtotiId(myTtotiId)
			.myTittoId(titto.getTtotiId())
			.myManittoAnimalName(titto.getTtotiAnimalName())
			.myManittoAnimalImageUrl(titto.getAnimal().getAnimalImageUrl())
			.myName(member.getMemberName())
			.myProfileImageUrl(member.getMemberProfileImageUrl())
			.myAnimalName(ttoti.getTtotiAnimalName())
			.myAnimalImageUrl(ttoti.getAnimal().getAnimalImageUrl())
			.myManitiMemberName(myManiti.getMemberName())
			.myManitiProfileImageUrl(myManiti.getMemberProfileImageUrl())
			.build();

		QuizHistoryDto todayManittoQuiz = quizServiceUtils.mapToQuizHistoryDto(
			quizAnswerRepository.findByTtotiIdAndQuizDate(ttoti.getTtotiId(), LocalDate.now()));
		QuizHistoryDto todayManitiQuiz = quizServiceUtils.mapToQuizHistoryDto(
			quizAnswerRepository.findByTtotiIdAndQuizDate(titto.getTtotiId(), LocalDate.now()));

		notificationInsertService.insertNotificationToAllMembersInRoom(room, NotificationType.GAME_START);
		fcmSendService.sendToRoomMembers(room, NotificationType.GAME_START);

		return RoomStartDto.builder()
			.ttotiMatchInfo(ttotiMatchDto)
			.todayManittoQuiz(todayManittoQuiz)
			.todayManitiQuiz(todayManitiQuiz)
			.build();
	}

	@Override
	@Transactional
	public Object handleAnimalSelection(Integer memberId, Integer roomId,
		RoomMemberAnimalSelectRequest roomMemberAnimalSelectRequest) {

		Member member = validator.validateMember(memberId);
		Room room = validator.validateRoom(roomId);

		if (room.getRoomIsStarted()) {
			throw new CustomException(ErrorCode.ROOM_IN_PROGRESS);
		}

		RoomMember roomMember = validator.validateMemberRoomAuthorization(room, member);
		AnimalDto animalDto = updateRoomMemberAnimal(room, member, roomMemberAnimalSelectRequest);

		List<RoomMember> readyRoomMemberList = roomMemberRepository.findByRoomAndRoomMemberIsDeletedAndRoomMemberIsReady(
			room, false, true);

		if (readyRoomMemberList.size() != room.getRoomParticipants()) {
			return AnimalSelectDto.builder()
				.animalId(animalDto.getAnimalId())
				.animalName(animalDto.getAnimalName())
				.animalImageUrl(animalDto.getAnimalImageUrl())
				.build();
		}
		return startRoom(room, readyRoomMemberList, roomMember, member);
	}
}
