package kr.co.ttoti.backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberDetailDto {
    private String memberId;
    private String memberName;
    private String memberProfileImageUrl;
}
