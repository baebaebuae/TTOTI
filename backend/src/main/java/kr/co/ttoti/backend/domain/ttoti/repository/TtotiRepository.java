package kr.co.ttoti.backend.domain.ttoti.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import kr.co.ttoti.backend.domain.room.dto.RoomTemperatureDto;
import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.global.auth.entity.Member;

@Repository
public interface TtotiRepository extends JpaRepository<Ttoti, Integer> {

	Ttoti findByTtotiId(Integer ttotiId);

	List<Ttoti> findByRoom(Room room);

	Ttoti findByRoomAndManitiId(Room room, Integer manitiId);

	Optional<Ttoti> findByTtotiIdAndMember(Integer ttotiId, Member member);

	Optional<Ttoti> findByRoomAndMember(Room room, Member member);

	@Query(
		"SELECT new kr.co.ttoti.backend.domain.member.dto.MemberDetailDto(m.memberUuid, m.memberName, m.memberProfileImageUrl) "
			+
			"FROM Ttoti t " +
			"JOIN TtotiEnding te ON t.ttotiId = te.ttotiId " +
			"JOIN Member m ON t.member.memberId = m.memberId " +
			"where t.room.roomId = :roomId AND te.endingCorrectScore BETWEEN :minScore AND :maxScore")
	List<MemberDetailDto> getBestCorrectMemberList(@Param("roomId") Integer roomId, @Param("minScore") float minScore,
		@Param("maxScore") float maxScore);

	@Query(
		"SELECT new kr.co.ttoti.backend.domain.member.dto.MemberDetailDto(m.memberUuid, m.memberName, m.memberProfileImageUrl) "
			+
			"FROM Ttoti t " +
			"JOIN TtotiEnding te ON t.ttotiId = te.ttotiId " +
			"JOIN Member m ON t.member.memberId = m.memberId " +
			"where t.room.roomId = :roomId AND te.endingChatCount = :maxChatCount")
	List<MemberDetailDto> getBestChatMemberList(@Param("roomId") Integer roomId,
		@Param("maxChatCount") int maxChatCount);

	@Query(
		"SELECT new kr.co.ttoti.backend.domain.member.dto.MemberDetailDto(m.memberUuid, m.memberName, m.memberProfileImageUrl) "
			+
			"FROM Ttoti t " +
			"JOIN TtotiEnding te ON t.ttotiId = te.ttotiId " +
			"JOIN Member m ON t.member.memberId = m.memberId " +
			"where t.room.roomId = :roomId AND te.endingFinalTemperature BETWEEN :minTemp AND :maxTemp")
	List<MemberDetailDto> getBestTemperatureMemberList(@Param("roomId") Integer roomId, @Param("minTemp") float minTemp,
		@Param("maxTemp") float maxTemp);

	Optional<Ttoti> findByMember_MemberIdAndRoom_RoomId(Integer memberId, Integer roomId);

	@Query("SELECT t.ttotiId "
		+ "FROM Ttoti t "
		+ "WHERE t.room = :room")
	List<Integer> findByTtotiIdsByRoom(@Param("room") Room room);

	@Query(
		"SELECT new kr.co.ttoti.backend.domain.room.dto.RoomTemperatureDto( " +
			"m.memberId, m.memberName, m.memberProfileImageUrl, " +
			"CAST((tm.currentTemperature - tm.temperatureDifference) AS float), " +
			"tm.temperatureDifference, tm.currentTemperature) " +
			"FROM Ttoti t " +
			"JOIN Member m ON m.memberId = t.member.memberId " +
			"JOIN Temperature tm ON tm.ttotiId = t.ttotiId " +
			"WHERE t.ttotiId = :ttotiId " +
			"ORDER BY tm.createdAt DESC"
	)
	Page<RoomTemperatureDto> findRoomTemperatureByTtotiId(@Param("ttotiId") Integer ttotiId, Pageable pageable);

}
