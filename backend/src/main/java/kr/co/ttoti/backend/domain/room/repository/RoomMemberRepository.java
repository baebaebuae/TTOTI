package kr.co.ttoti.backend.domain.room.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.room.entity.RoomMember;
import kr.co.ttoti.backend.global.auth.entity.Member;

@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, Integer> {

	List<RoomMember> findByRoom(Room room);

	List<RoomMember> findByMemberAndRoomMemberIsDeletedFalse(Member member);

	List<RoomMember> findByRoomAndRoomMemberIsDeletedFalse(Room room);

	Integer countByRoomAndRoomMemberIsDeletedFalse(Room room);

	Optional<RoomMember> findByMemberAndRoom(Member member, Room room);

	Optional<RoomMember> findByRoomAndMemberAndRoomMemberIsDeleted(Room room, Member member,
		Boolean roomMemberIsDeleted);

	List<RoomMember> findByRoomAndRoomMemberIsDeletedAndRoomMemberIsReady(Room room, Boolean roomMemberIsDeleted,
		Boolean roomMemberIsReady);

	@Query(value = "SELECT m.memberName " +
		"FROM RoomMember rm " +
		"JOIN rm.member m " +
		"WHERE rm.room.roomId = :roomId")
	List<String> getNamesByRoomId(@Param("roomId") Integer roomId);

	@Query("SELECT rm2.member " +
		"FROM RoomMember rm " +
		"JOIN rm.room r " +
		"JOIN RoomMember rm2 ON rm2.room = r " +
		"WHERE rm.member.memberId = :memberId " +
		"AND rm2.member.memberId != :memberId " +
		"AND r.roomIsDeleted = false " +
		"AND r.roomIsFinished = true ")
	List<Member> getFriendsByMemberId(Integer memberId);

	@Query("SELECT rm.member.memberId " +
		"FROM RoomMember rm " +
		"WHERE rm.room = :room " +
		"AND rm.roomMemberIsDeleted = false")
	List<Integer> findMemberIdsByRoomAndIsDeletedFalse(@Param("room") Room room);

	Optional<RoomMember> findByRoomMemberId(Integer roomMemberId);

}