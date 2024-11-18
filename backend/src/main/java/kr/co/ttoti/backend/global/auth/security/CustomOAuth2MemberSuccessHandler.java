package kr.co.ttoti.backend.global.auth.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.jwt.JwtProvider;
import kr.co.ttoti.backend.global.redis.entity.RefreshToken;
import kr.co.ttoti.backend.global.redis.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

import static kr.co.ttoti.backend.global.status.ErrorCode.MEMBER_NOT_FOUND;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    @Value("${callback}")
    private String CALLBACK_URI;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        String memberUuid = memberRepository.findByMemberProviderId(oAuth2User.getProviderId()).orElseThrow(()->new CustomException(MEMBER_NOT_FOUND)).getMemberUuid();

        String accessToken = jwtProvider.createAccessToken(memberUuid);
        String refreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.save(RefreshToken.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .memberId(memberUuid)
                .expiresIn(refreshExpiration)
                .build());

        String redirectUrl = UriComponentsBuilder.fromUriString(CALLBACK_URI)
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
