package kr.co.ttoti.backend.global.auth.security;

import kr.co.ttoti.backend.global.auth.entity.OAuth2Provider;
import kr.co.ttoti.backend.global.auth.user.KakaoUserInfo;
import kr.co.ttoti.backend.global.auth.user.UserRole;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Getter
public final class CustomOAuth2User implements OAuth2User {

    private final OAuth2Provider providerName;
    private final Long providerId;
    private final String email;
    private final String name; // 뭔가 이상함 name이 아니라 ID일지도
    private final String profileImageUrl;
    private final Map<String, Object> attributes;
    private final UserRole authorities;

    CustomOAuth2User(KakaoUserInfo kakaoUserInfo, Map<String, Object> attributes) {
        this.providerName = OAuth2Provider.KAKAO;
        this.providerId = kakaoUserInfo.getId();
        this.email = kakaoUserInfo.getKakaoAccount().getEmail();
        this.name = kakaoUserInfo.getKakaoAccount().getProfile().getNickname();
        this.profileImageUrl = kakaoUserInfo.getKakaoAccount().getProfile().getProfileImageUrl();
        this.attributes = attributes;
        this.authorities = UserRole.USER;
    }

//    CustomOAuth2User(NaverUserInfo naverUserInfo, String username, Map<String, Object> attributes) {
//        this.providerName = OAuth2Provider.naver;
//        this.providerId = naverUserInfo.id();
//        this.username = username;
//        this.attributes = attributes;
//        this.authorities = UserRole.USER;
//    }
//
//    CustomOAuth2User(GoogleUserInfo googleUserInfo, String username, Map<String, Object> attributes) {
//        this.providerName = OAuth2Provider.google;
//        this.providerId = googleUserInfo.sub();
//        this.username = username;
//        this.attributes = attributes;
//        this.authorities = UserRole.USER;
//    }

    @Override
    public String getName() {
        return name;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(authorities);
    }

}