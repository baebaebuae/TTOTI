package kr.co.ttoti.backend.domain.member.service;

import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.security.CustomOAuth2User;

import java.util.Optional;

public interface MemberService {
    public void join(CustomOAuth2User customOAuth2User);

    public Optional<Member> getMemberIdByProviderId(Long id);

    public MemberDetailDto getMemberDetail(Integer memberId);
}