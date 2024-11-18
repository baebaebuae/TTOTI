package kr.co.ttoti.backend.domain.auth.service;

import kr.co.ttoti.backend.domain.auth.dto.ReissueResponse;

public interface AuthService {
    void logout(String accessToken);

    ReissueResponse reissue(String accessToken, String refreshToken);
}