package kr.co.ttoti.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    OK(200, "성공"),

    LOGIN_SUCCESS(200, "로그인 성공"),
    LOGOUT_SUCCESS(204, "로그아웃 성공"),
    REISSUE_SUCCESS(201, "토큰 재발급 성공"),

    MEMBER_DETAIL_SUCCESS(200, "사용자 정보 조회 성공"),
    MEMBER_NAME_UPDATE_SUCCESS(200, "사용자 이름 수정 성공"),

    ROOM_CREATE_SUCCESS(200, "방 생성 성공"),
    ANIMAL_SELECT_SUCCESS(200, "동물 선택 성공"),
    ROOM_START_SUCCESS(200, "방 시작 성공"),
    ROOM_PENDING_DETAIL_SUCCESS(200, "시작 전 방 상세 조회 성공"),
    ROOM_IN_PROGRESS_DETAIL_SUCCESS(200, "진행 중 방 상세 조회 성공"),
    ROOM_DELETE_SUCCESS(200, "방장 퇴장으로 인한 방 삭제 성공"),
    ROOM_MEMBER_DELETE_SUCCESS(200, "방 퇴장 성공"),

    // Room Member
    CREATE_ROOM_MEMBER_SUCCESS(200, "방 입장 성공"),

    QUIZ_LIST_GET_SUCCESS(200, "퀴즈 목록 조회 성공"),
    QUIZ_LIST_GET_SUCCESS_NO_CONTENT(200, "퀴즈 목록 조회에 성공했으나 데이터가 존재하지 않습니다"),
    QUIZ_ANSWER_SUCCESS(200, "퀴즈 응답 처리 성공"),

    ;

    private final int httpStatus;
    private final String message;
}
