package kr.co.ttoti.backend.domain.member.controller;

import kr.co.ttoti.backend.domain.member.dto.ManittoGamesRequest;
import kr.co.ttoti.backend.domain.member.dto.ManittoGameDto;
import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import kr.co.ttoti.backend.domain.member.dto.MemberNameRequest;
import kr.co.ttoti.backend.domain.member.service.MypageService;
import kr.co.ttoti.backend.domain.ttoti.dto.TtotiEndingDto;
import kr.co.ttoti.backend.global.auth.annotation.MemberId;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static kr.co.ttoti.backend.global.status.SuccessCode.MEMBER_NAME_UPDATE_SUCCESS;
import static kr.co.ttoti.backend.global.status.SuccessCode.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ttoti/members/mypage")
public class MypageController {

    private final MypageService mypageService;

    @PatchMapping("/name")
    public ResponseEntity<ResponseDto<Void>> updateMemberName(@MemberId Integer memberId,
                                                              @RequestBody MemberNameRequest memberNameRequest) {

        mypageService.updateMemberName(memberId, memberNameRequest.getMemberName());

        return ResponseEntity.ok(ResponseDto.success(MEMBER_NAME_UPDATE_SUCCESS));
    }

    @PostMapping("/game")
    public ResponseEntity<ResponseDto<List<ManittoGameDto>>> getManittoGameList(@MemberId Integer memberId,
                                                                                @RequestBody ManittoGamesRequest manittoGamesRequest) {

        List<ManittoGameDto> manittoGameDtoList = mypageService.getManittoGameList(memberId, manittoGamesRequest);

        return ResponseEntity.ok(ResponseDto.success(OK, manittoGameDtoList));
    }


    @GetMapping("/friend")
    public ResponseEntity<ResponseDto<List<MemberDetailDto>>> getManittoFriendList(@MemberId Integer memberId){

        List<MemberDetailDto> memberDetailDtoList = mypageService.getManittoFriendList(memberId);

        return ResponseEntity.ok(ResponseDto.success(OK, memberDetailDtoList));
    }

    @GetMapping("/{room-id}")
    public ResponseEntity<ResponseDto<TtotiEndingDto>> getEnding(@MemberId Integer memberId,
                                                                 @PathVariable("room-id") Integer roomId) {

        TtotiEndingDto ending = mypageService.getEnding(memberId, roomId);

        return ResponseEntity.ok(ResponseDto.success(OK, ending));
    }

}
