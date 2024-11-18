package kr.co.ttoti.backend.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.ttoti.backend.global.auth.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

	Optional<Member> findByMemberId(Integer memberId);

	Optional<Member> findByMemberIdAndMemberIsDeletedFalse(Integer memberId);

    Optional<Member> findByMemberProviderId(Long memberProviderId);

	Optional<Member> findByMemberUuid(String memberUuid);

	Optional<Member> findByMemberUuidAndMemberIsDeletedFalse(String memberUuid);
}
