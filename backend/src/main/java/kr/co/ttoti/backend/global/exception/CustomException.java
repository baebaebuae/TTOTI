package kr.co.ttoti.backend.global.exception;

import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    ErrorCode errorCode;
}