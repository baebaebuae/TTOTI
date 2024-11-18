package kr.co.ttoti.backend.domain.guess.controller;

import kr.co.ttoti.backend.domain.guess.dto.GuessUpdateRequest;
import kr.co.ttoti.backend.domain.guess.service.GuessUpdateService;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/ttotis/guess")
public class GuessUpdateController {

    private final GuessUpdateService guessUpdateService;

    @PostMapping
    public ResponseEntity<Void> updateGuess(@MemberId Integer memberId, @RequestBody GuessUpdateRequest guessUpdateRequest) {

        guessUpdateService.updateGuess(memberId, guessUpdateRequest.getRoomId(), guessUpdateRequest.getRoomMemberId());
        return ResponseEntity.noContent().build();
    }
}
