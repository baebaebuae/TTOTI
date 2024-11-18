package kr.co.ttoti.backend.domain.auth.service;

import kr.co.ttoti.backend.domain.auth.dto.ReissueResponse;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.jwt.JwtProvider;
import kr.co.ttoti.backend.global.redis.entity.LogoutToken;
import kr.co.ttoti.backend.global.redis.entity.RefreshToken;
import kr.co.ttoti.backend.global.redis.repository.LogoutRepository;
import kr.co.ttoti.backend.global.redis.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static kr.co.ttoti.backend.global.status.ErrorCode.EXPIRED_TOKEN;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;

    @Value("${jwt.access-expiration}")
    private Long accessExpiration;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    private final LogoutRepository logoutRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    @Transactional
    public void logout(String accessToken) {
        LogoutToken logoutToken = LogoutToken.builder()
                .accessToken(accessToken)
                .expiresIn(accessExpiration)
                .build();

        logoutRepository.save(logoutToken);
        refreshTokenRepository.deleteByAccessToken(accessToken);
    }

    @Override
    @Transactional
    public ReissueResponse reissue(String oldAccessToken, String oldRefreshToken) {
        RefreshToken token = refreshTokenRepository.findById(oldRefreshToken)
                .orElseThrow(() -> new CustomException(EXPIRED_TOKEN));

        if (!token.getAccessToken().equals(oldAccessToken)) {
            throw new CustomException(EXPIRED_TOKEN);
        }

        String memberId = token.getMemberId();
        String newAccessToken = jwtProvider.createAccessToken(memberId);
        String newRefreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.deleteById(oldRefreshToken);

        refreshTokenRepository.save(RefreshToken.builder()
                .memberId(memberId)
                .refreshToken(newRefreshToken)
                .accessToken(newAccessToken)
                .expiresIn(refreshExpiration)
                .build());

        return ReissueResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
