package kr.co.ttoti.backend.domain.room.document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import kr.co.ttoti.backend.domain.member.dto.MemberDetailDto;
import lombok.*;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "room_ending")
public class RoomEnding {

    // 방 Id
    @Id
    private Integer id;

    // 방 정보
    private String roomName;
    private Integer roomParticipants;
    private LocalDate roomStartDate;
    private LocalTime roomStartTime;
    private LocalDate roomFinishDate;
    private LocalTime roomFinishTime;

    // 마니또 마니띠 관계
    private List<ttotiPair> ttotiList;

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ttotiPair {
        private MemberDetailDto manitto;
        private MemberDetailDto maniti;
    }

    // 베스트멤버
    private Float bestCorrectScore;
    private List<MemberDetailDto> bestCorrectMemberList;
    private Integer bestChatCount;
    private List<MemberDetailDto> bestChatMemberList;
    private Float bestFinalTemperature;
    private List<MemberDetailDto> bestTemperatureMemberList;
}
