package kr.co.ttoti.backend.domain.ttoti.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "ttoti_ending")
public class TtotiEnding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ttoti_ending_id")
    private Integer ttotiEndingId;

    @NotNull
    @Column(name = "ttoti_id")
    private Integer ttotiId;

    @NotNull
    @Column(name = "ending_correct_score")
    private Float endingCorrectScore;

    @NotNull
    @Column(name = "ending_chat_count")
    private Integer endingChatCount;

    @NotNull
    @Column(name = "ending_final_temperature")
    private Float endingFinalTemperature;
}
