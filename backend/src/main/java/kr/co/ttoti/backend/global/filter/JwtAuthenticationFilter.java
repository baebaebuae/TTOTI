package kr.co.ttoti.backend.global.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.jwt.JwtProvider;
import kr.co.ttoti.backend.global.redis.repository.LogoutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static kr.co.ttoti.backend.global.status.ErrorCode.ALREADY_LOGOUT;
import static kr.co.ttoti.backend.global.status.ErrorCode.JWT_ERROR;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final LogoutRepository logoutRepository;
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtProvider.getAccessTokenFromRequest(request);

        try {
            if (request.getRequestURI().startsWith("/chat")) {
                filterChain.doFilter(request, response);
                return;
            }

            if (!jwtProvider.validateAccessToken(accessToken)) {
                throw new CustomException(JWT_ERROR);
            }

            boolean isLogout = logoutRepository.findById(accessToken).isPresent();
            if (isLogout) {
                throw new CustomException(ALREADY_LOGOUT);
            }

            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("USER"));
            User principal = new User(jwtProvider.getMemberIdFromAccessToken(accessToken), "", authorities);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(principal, accessToken, authorities));
        } catch (CustomException e) {
            log.info("JWT 검증 필터 에러! 요청 URL:{} 에러 메세지: {}", request.getRequestURI(),e.getErrorCode().getMessage());
        }

        filterChain.doFilter(request, response);
    }
}