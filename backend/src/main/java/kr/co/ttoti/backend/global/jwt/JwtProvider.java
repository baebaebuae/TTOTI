package kr.co.ttoti.backend.global.jwt;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import kr.co.ttoti.backend.global.auth.repository.MemberRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.*;
import java.security.Key;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;

import static kr.co.ttoti.backend.global.status.ErrorCode.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
public class JwtProvider {

    public static final String BEARER_PREFIX = "bearer ";

    private final Duration accessExpiration;
    private final Key key;
    private final MemberRepository memberRepository;

    public JwtProvider(@Value("${jwt.secret-key}") String secretKey,
                       @Value("${jwt.access-expiration}") Long accessExpiration,
                       MemberRepository memberRepository) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessExpiration = Duration.ofSeconds(accessExpiration);
        this.memberRepository = memberRepository;
    }

    public String getAccessTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader(AUTHORIZATION);

        return getAccessTokenFromHeader(header);
    }

    public String getAccessTokenFromHeader(String header) {
        if (header == null || !header.toLowerCase().startsWith(BEARER_PREFIX)) {
            return null;
        }
        return header.substring(BEARER_PREFIX.length());
    }

    @Transactional(readOnly = true)
    public Integer getRealMemberIdFromAccessToken(String accessToken) {
        String memberUuid = getMemberIdFromAccessToken(accessToken);
        return memberRepository.findByMemberUuidAndMemberIsDeletedFalse(memberUuid).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND)).getMemberId();
    }

    public String getMemberIdFromAccessToken(String accessToken) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody()
                .get("memberId");
    }

    public String createAccessToken(String memberId) {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime expirationTime = now.plus(accessExpiration);

        return Jwts.builder()
                .claim("memberId", memberId)
                .setExpiration(Date.from(expirationTime.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken() {
        return UUID.randomUUID().toString();
    }

    public boolean validateAccessToken(String accessToken) {
        if (!StringUtils.hasText(accessToken)) {
            return false;
        }

        Claims claims = parseClaims(accessToken);
        return claims.getExpiration().after(new Date());
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (MalformedJwtException e) {
            throw new CustomException(MALFORMED_TOKEN);
        } catch (UnsupportedJwtException e) {
            throw new CustomException(UNSUPPORTED_TOKEN);
        } catch (JwtException e) {
            throw new CustomException(JWT_ERROR);
        }
    }
}
