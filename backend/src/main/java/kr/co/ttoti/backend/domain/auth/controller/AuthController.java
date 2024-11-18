package kr.co.ttoti.backend.domain.auth.controller;

import kr.co.ttoti.backend.domain.auth.dto.ReissueRequest;
import kr.co.ttoti.backend.domain.auth.dto.ReissueResponse;
import kr.co.ttoti.backend.domain.auth.service.AuthService;
import kr.co.ttoti.backend.global.auth.annotation.AccessToken;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static kr.co.ttoti.backend.global.status.SuccessCode.LOGOUT_SUCCESS;
import static kr.co.ttoti.backend.global.status.SuccessCode.REISSUE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/logout")
    public ResponseDto<Void> logout(@AccessToken String accessToken) {
        authService.logout(accessToken);

        return ResponseDto.success(LOGOUT_SUCCESS);
    }

    @PatchMapping("/reissue")
    public ResponseDto<ReissueResponse> reissueAccessToken(@AccessToken String accessToken,
                                                           @RequestBody ReissueRequest reissueRequest) {
        ReissueResponse reissue = authService.reissue(accessToken, reissueRequest.getRefreshToken());

        return ResponseDto.success(REISSUE_SUCCESS, reissue);
    }
}