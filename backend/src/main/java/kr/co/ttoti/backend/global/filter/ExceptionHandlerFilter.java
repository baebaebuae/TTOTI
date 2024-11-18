package kr.co.ttoti.backend.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.handler.codec.http.HttpHeaderValues;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.sasl.AuthenticationException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;

import static kr.co.ttoti.backend.global.status.ErrorCode.AUTHENTICATION_REQUIRED;
import static org.springframework.security.oauth2.core.OAuth2ErrorCodes.ACCESS_DENIED;

@Component
@RequiredArgsConstructor
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (CustomException e) {
            errorResponse(response, e.getErrorCode());
        } catch (AccessDeniedException e) {
            errorResponse(response, ACCESS_DENIED);
        } catch (AuthenticationException e) {
            errorResponse(response, AUTHENTICATION_REQUIRED);
        } catch (Exception e) {
            errorResponse(response, e.getMessage());
        }
    }

    private void errorResponse(HttpServletResponse response, ErrorCode code) throws IOException {
        ResponseDto<?> dto = ResponseDto.fail(code);
        writeResponse(response, dto);
    }

    private void errorResponse(HttpServletResponse response, String message) throws IOException {
        ResponseDto<?> dto = ResponseDto.fail(HttpStatus.INTERNAL_SERVER_ERROR, message);
        writeResponse(response, dto);
    }

    private void writeResponse(HttpServletResponse response, ResponseDto<?> dto) throws IOException {
        response.setStatus(400);
        response.setContentType(HttpHeaderValues.APPLICATION_JSON.toString());
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());

        String responseBody = objectMapper.writeValueAsString(dto);
        response.getWriter().write(responseBody);
    }

}
