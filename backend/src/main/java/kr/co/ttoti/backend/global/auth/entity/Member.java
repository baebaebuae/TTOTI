package kr.co.ttoti.backend.global.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import kr.co.ttoti.backend.global.base.BaseEntity;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer memberId;

    @NotNull
    @Column(name = "member_uuid")
    private String memberUuid;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "member_social_category")
    private OAuth2Provider memberSocialCategory;

    @NotNull
    @Column(name = "member_provider_id")
    private Long memberProviderId;

    @NotNull
    @Column(name = "member_email")
    private String memberEmail;

    @NotNull
    @Column(name = "member_name")
    private String memberName;

    @NotNull
    @Column(name = "member_profile_image_url")
    private String memberProfileImageUrl;

    @NotNull
    @Column(name = "member_is_deleted")
    private Boolean memberIsDeleted;

    @Column(name = "member_deleted_at")
    private LocalDateTime memberDeletedAt;

    public void changeMemberName(String memberName){
        this.memberName = memberName;
    }
}
