package kr.co.ttoti.backend.domain.common;

import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.animal.entity.Animal;
import kr.co.ttoti.backend.domain.animal.repository.AnimalRepository;
import kr.co.ttoti.backend.domain.quiz.entity.Quiz;
import kr.co.ttoti.backend.domain.quiz.entity.QuizAnswer;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.quiz.repository.QuizRepository;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.domain.room.repository.RoomMemberRepository;
import kr.co.ttoti.backend.domain.room.repository.RoomRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Validator {

	private final TtotiRepository ttotiRepository;
	private final MemberRepository memberRepository;
	private final RoomRepository roomRepository;
	private final RoomMemberRepository roomMemberRepository;
	private final AnimalRepository animalRepository;
	private final QuizRepository quizRepository;
	private final QuizAnswerRepository quizAnswerRepository;

	public Member validateMember(Integer memberId) {
		return memberRepository.findByMemberIdAndMemberIsDeletedFalse(memberId)
			.orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
	}

	public Member validateMember(String memberUUID) {
		return memberRepository.findByMemberUuid(memberUUID)
				.orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
	}

	public Room validateRoom(Integer roomId) {
		return roomRepository.findByRoomIdAndRoomIsDeletedFalse(roomId).orElseThrow(
			() -> new CustomException(ErrorCode.ROOM_NOT_FOUND)
		);
	}

	public Room validateFinishedRoom(Integer roomId) {
		return roomRepository.findByRoomIdAndRoomIsStartedTrueAndRoomIsFinishedTrueAndRoomIsDeletedFalse(roomId).orElseThrow(
			() -> new CustomException(ErrorCode.ROOM_NOT_FOUND)
		);
	}

	public RoomMember validateMemberRoomAuthorization(Room room, Member member) {
		return roomMemberRepository.findByRoomAndMemberAndRoomMemberIsDeleted(room, member, false)
			.orElseThrow(
				() -> new CustomException(ErrorCode.ROOM_UNAUTHORIZED)
			);
	}

	public Ttoti validateTtoti(Integer ttotiId) {
		return ttotiRepository.findById(ttotiId)
			.orElseThrow(
				() -> new CustomException(ErrorCode.TTOTI_NOT_FOUND));
	}

	public Ttoti validateManittoByTtotiIdAndMember(Integer ttotiId, Member member) {
		return ttotiRepository.findByTtotiIdAndMember(ttotiId, member).orElseThrow(
			() -> new CustomException(ErrorCode.TTOTI_INVALID_MANITTO)
		);
	}

	public Animal validateAnimal(Integer animalId) {
		return animalRepository.findByAnimalIsAvailableAndAnimalId(true, animalId)
			.orElseThrow(() -> new CustomException(ErrorCode.ANIMAL_NOT_AVAILABLE));

	}

	public Quiz validateQuizAvailability(Integer quizId, Boolean quizIsAvailable) {
		return quizRepository.findByQuizIdAndQuizIsAvailable(quizId, quizIsAvailable).orElseThrow(
			() -> new CustomException(ErrorCode.QUIZ_NOT_FOUND));
	}

	public QuizAnswer validateQuizAnswerByTtotiIdAndQuiz(Integer ttotiId, Quiz quiz) {
		return quizAnswerRepository.findByTtotiIdAndQuiz(ttotiId, quiz).orElseThrow(
			() -> new CustomException(ErrorCode.QUIZ_NOT_FOUND)
		);
	}

	public Member validateRoomHost(Room room) {
		return memberRepository.findByMemberId(room.getRoomHostMemberId()).orElseThrow(
			() -> new CustomException(ErrorCode.ROOM_HOST_MEMBER_NOT_FOUND)
		);
	}
}
