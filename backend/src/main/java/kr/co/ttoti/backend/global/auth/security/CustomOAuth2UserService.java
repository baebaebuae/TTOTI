package kr.co.ttoti.backend.global.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.ttoti.backend.domain.member.service.MemberService;
import kr.co.ttoti.backend.global.auth.entity.Member;
import kr.co.ttoti.backend.global.auth.entity.OAuth2Provider;
import kr.co.ttoti.backend.global.auth.user.KakaoUserInfo;
import kr.co.ttoti.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

import static kr.co.ttoti.backend.global.status.ErrorCode.BAD_REQUEST;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final ObjectMapper objectMapper;
    private final DefaultOAuth2UserService service = new DefaultOAuth2UserService();
    private final MemberService memberService;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = service.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        CustomOAuth2User oAuthMember = toOAuth2User(userRequest.getClientRegistration().getClientName(), attributes);

        Optional<Member> member = memberService.getMemberIdByProviderId(oAuthMember.getProviderId());
        if (member.isEmpty()) {
            memberService.join(oAuthMember);
        }
        return oAuthMember;
    }

    private CustomOAuth2User toOAuth2User(String clientName, Map<String, Object> attributes) {
        switch (clientName) {
            case "kakao" -> {
                KakaoUserInfo userInfo = objectMapper.convertValue(attributes, KakaoUserInfo.class);
                return new CustomOAuth2User(userInfo, attributes);
            }
            default -> throw new CustomException(BAD_REQUEST);
        }
    }
}
