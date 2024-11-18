package kr.co.ttoti.backend.domain.ttoti.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyManittoDto {

    private String manittoProfileImageUrl;

    private String manittoNickname;
}
