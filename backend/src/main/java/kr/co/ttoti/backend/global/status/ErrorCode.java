package kr.co.ttoti.backend.global.status;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Global
    BAD_REQUEST(400, "실패"),
    METHOD_NOT_ALLOWED(405, "유효하지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러"),

    // JWT
    JWT_ERROR(401, "토큰 에러가 발생했습니다."),
    EXPIRED_TOKEN(401, "만료된 토큰입니다."),
    MALFORMED_TOKEN(401, "유효하지 않은 토큰입니다."),
    UNSUPPORTED_TOKEN(401, "허용되지 않은 토큰입니다."),

    // Auth
    AUTHORIZATION_HEADER_NOT_EXIST(401, "인증 헤더가 존재하지 않습니다."),
    UNAUTHORIZED(401, "인증되지 않은 요청입니다."),
    ACCESS_DENIED(403, "허용되지 않는 접근입니다."),
    AUTHENTICATION_REQUIRED(401, "올바르지 않은 권한입니다."),
    ALREADY_LOGOUT(401, "이미 로그아웃한 토큰입니다."),

    // OAuth
    WRONG_PROVIDER(404, "지원하지 않는 소셜 로그인입니다."),
    KAKAO_PARAMETER_ERROR(400, "유효하지 않은 카카오 로그인 요청입니다."),
    KAKAO_SERVER_ERROR(500, "카카오 서버 오류입니다."),

    // member
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다"),
    MEMBER_NAME_FORBIDDEN(400, "규칙에 어긋나는 사용자 이름입니다."),

    // room
    ROOM_NOT_FOUND(404, "존재하지 않는 방입니다"),
    ROOM_IS_PENDING(401, "게임이 시작되지 않은 방입니다"),
    ROOM_IN_PROGRESS(401, "이미 게임이 시작된 방입니다"),
	ROOM_UNAUTHORIZED(401, "방에 접근할 권한이 없습니다"),
    ROOM_LINK_NOT_CREATED(500, "초대링크를 생성할 수 없습니다"),
    ROOM_FULL(409, "인원이 가득 찬 방입니다"),
    ROOM_UPDATE_UNAUTHORIZED(401, "방 정보는 방장만 수정할 수 있습니다"),
    ROOM_PARTICIPANTS_TOO_LOW(401, "현재 인원보다 적은 값으로는 수정할 수 없습니다"),
    ROOM_FINISHED_TIME_IS_VALIDATION(400, "종료 시간이 이상적이지 않습니다"),

	// room member
	ROOM_HOST_MEMBER_NOT_FOUND(404, "방장이 존재하지 않습니다"),
    ROOM_MEMBER_NOT_FOUND(404, "존재하지 않는 방 회원 입니다"),
    ROOM_MEMBER_NOT_IN_ROOM(404, "해당 방의 방 회원이 아닙니다"),

	// animal
    ANIMAL_NOT_AVAILABLE(400, "사용 가능한 동물이 아닙니다."),

    //quiz
    QUIZ_LIST_NOT_FOUND(404, "오늘의 퀴즈와 퀴즈 이력이 없습니다."),
    UNANSWERED_QUIZ_NOT_FOUND(404, "새롭게 낼 퀴즈가 존재하지 않습니다"),
    QUIZ_NOT_FOUND(404, "퀴즈가 존재하지 않거나, 사용할 수 없는 퀴즈입니다"),
    QUIZ_ANSWER_NOT_FOUND(404, "응답할 수 있는 퀴즈가 아닙니다"),
    QUIZ_EXPIRED(400, "기간이 지난 퀴즈에는 응답할 수 없습니다"),

    // ttoti
    TTOTI_NOT_FOUND(404, "또띠관계가 존재하지 않습니다."),
    TTOTI_INVALID_MANITTO(400, "해당 또띠관계의 마니또가 아닙니다."),
    TTOTI_INVALID_MANITI(400,"해당 또띠관계의 마니띠가 아닙니다."),

    // ending
    TTOTI_ENDING_NOT_FOUND(404, "또띠 엔딩이 존재하지 않습니다."),
    ROOM_ENDING_NOT_FOUND(404, "방 엔딩이 존재하지 않습니다."),

    // guess
    GUESS_NOT_EXISTS(400, "추측하는 날이 아닙니다"),
    GUESS_ALREADY_ANSWERED(400, "이미 추측을 완료했습니다"),
    GUESS_NOT_INSERTED(500, "추측이 생성되지 않았습니다"),
    ;

    private final int httpStatus;
    private final String message;
}
