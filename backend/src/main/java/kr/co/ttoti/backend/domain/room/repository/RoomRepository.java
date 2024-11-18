package kr.co.ttoti.backend.domain.room.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.notification.dto.UnAnsweredMemberDto;
import kr.co.ttoti.backend.domain.room.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

	Optional<Room> findByRoomCode(String roomCode);

	Optional<Room> findByRoomIdAndRoomIsDeletedFalse(Integer roomId);

	Optional<Room> findByRoomIdAndRoomIsStartedFalse(Integer roomId);

	List<Room> findByRoomIsDeletedFalseAndRoomIsStartedTrueAndRoomIsFinishedFalse();

	@Query("SELECT r " +
		"FROM Room r " +
		"WHERE r.roomIsDeleted = false AND r.roomIsStarted = true AND r.roomIsFinished = false " +
		"AND (r.roomFinishDate < :currentDate OR (r.roomFinishDate = :currentDate AND r.roomFinishTime <= :currentTime))")
	List<Room> findInProgressRooms(@Param("currentDate") LocalDate currentDate,
		@Param("currentTime") LocalTime currentTime);

	@Query("SELECT r " +
		"FROM RoomMember rm " +
		"JOIN rm.room r " +
		"WHERE rm.member.memberId = :memberId " +
		"AND r.roomIsDeleted = false " +
		"AND r.roomIsFinished = true " +
		"AND r.roomStartDate >= :startDate " +
		"AND r.roomFinishDate <= :endDate")
	List<Room> findRoomsByMemberIdAndDate(@Param("memberId") Integer memberId, @Param("startDate") LocalDate startDate,
		@Param("endDate") LocalDate endDate);

	@Query("SELECT DISTINCT r " +
		"FROM RoomMember rm " +
		"JOIN rm.room r " +
		"JOIN RoomMember rm2 ON rm2.room = r " +
		"WHERE rm.member.memberId = :memberId " +
		"AND rm2.member.memberId = :friendId " +
		"AND r.roomIsDeleted = false " +
		"AND r.roomIsFinished = true " +
		"AND r.roomStartDate >= :startDate " +
		"AND r.roomFinishDate <= :endDate")
	List<Room> findRoomsByMemberIdAndDateAndFriendId(@Param("memberId") Integer memberId,
		@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate,
		@Param("friendId") Integer friendId);

	Optional<Room> findByRoomIdAndRoomIsStartedTrueAndRoomIsFinishedTrueAndRoomIsDeletedFalse(Integer roomId);

	@Query("SELECT new kr.co.ttoti.backend.domain.notification.dto.UnAnsweredMemberDto(t.member.memberId, r.roomId, r.roomName) " +
		"FROM Room r " +
		"JOIN QuizAnswer qa ON r.roomId = qa.roomId " +
		"JOIN Ttoti t ON qa.ttotiId = t.ttotiId " +
		"WHERE r.roomIsStarted = true " +
		"AND r.roomIsFinished = false " +
		"AND r.roomIsDeleted = false " +
		"AND qa.quizDate = :today " +
		"AND qa.isManittoAnswered = false")
	List<UnAnsweredMemberDto> findMemberIdsWithUnansweredQuizzes(@Param("today") LocalDate today);

	@Query(value = "SELECT r "
		+ "FROM Room r "
		+ "WHERE r.roomIsStarted = true "
		+ "AND r.roomIsFinished = false "
		+ "AND r.roomIsDeleted = false "
		+ "AND r.roomMidDate = :today")
	List<Room> getRoomByMidDate(@Param("today") LocalDate today);

	@Query("SELECT DISTINCT rm.member.memberId " +
		"FROM RoomMember rm " +
		"JOIN rm.room r " +
		"WHERE r.roomIsStarted = true " +
		"AND r.roomIsFinished = false " +
		"AND r.roomIsDeleted = false")
	List<Integer> findMemberIdsWithActiveGames();

	@Query("SELECT r " +
			"FROM Room r " +
			"WHERE r.roomIsStarted = true AND r.roomIsFinished = false AND r.roomIsDeleted = false " +
			"AND (r.roomMidDate = :dateMid OR r.roomFinishDate = :dateFinish)" +
			"AND r.roomFinishTime = :time "
	)
	List<Room> getRoomByDatesAndRoomFinishTime(@Param("dateMid") LocalDate dateMid, @Param("dateFinish") LocalDate dateFinish, @Param("time") LocalTime time);
}