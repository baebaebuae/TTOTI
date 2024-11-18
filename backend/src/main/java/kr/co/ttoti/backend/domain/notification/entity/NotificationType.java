package kr.co.ttoti.backend.domain.notification.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {

	GAME_START("게임 시작","마니또 게임이 시작됐어요!", "마니또 게임이 시작됐어요! 나만의 마니또, 마니띠와 즐거운 시간을 보내보세요!"),
	TODAY_QUIZ_OPENED("퀴즈 알림","오늘의 퀴즈가 공개됐어요!", "오늘의 퀴즈와 어제의 퀴즈 정답이 공개됐어요!"),
	MANITTO_GUESS_OPENED("추측하기","내 마니또는 누구일까?","내 마니또는 누구일까? 추측하러 가볼까요?"),
	MANITTO_CHAT("채팅 알림","마니또에게 메시지가 왔어요!", "답장하러 가볼까요?"),
	MANITI_CHAT("채팅 알림","마니띠에게 메시지가 왔어요!", "답장하러 가볼까요?"),
	FINAL_MANITTO_GUESS_OPENED("추측하기","내 마니또는 누구일까?", "내일은 마니또의 정체가 밝혀지는 날이에요! 내 마니또는 누구일지 추측하러 가볼까요?"),
	GAME_END("게임 종료","마니또의 정체가 공개됐어요!", "마니또의 정체가 공개됐어요! 내 마니또는 누구였을까? 마니또는 가면을 벗고 정체를 공개해주세요!"),

	QUIZ_ANSWER_REMINDER("퀴즈 알림","아직 오늘의 퀴즈에 응답하지 않았어요.","내 마니또, 마니띠가 응답을 기다리고 있어요!"),
	MANITI_CHAT_REMINDER("채팅 알림","아직 마니띠와 채팅을 하지 않았어요.","마니띠에게 격려의 메시지를 보내볼까요?"),
	GUESS_ANSWER_REMINDER("추측하기","중간 추측 시간이 얼마 남지 않았어요.","내 마니또는 누구일지 추측해보세요!"),
	FINAL_GUESS_ANSWER_REMINDER("추측하기","최종 추측 시간이 얼마 남지 않았어요.","내 마니또가 누구인지 추측해보세요!"),
	GAME_END_REMINDER("게임 종료","종료된 게임이 있어요.","내 마니또의 정체와 게임 기록을 확인하러 가볼까요?"),

	GUESS_IS_CORRECT("추측 성공", "당신의 마니띠는 추측을 성공했어요", "정체를 더 숨겨보세요"),
	GUESS_IS_WRONG("추측 실패", "당신의 마니띠는 추측을 실패했어요", "좋아요, 이대로 몰래 잘 챙겨주세요"),
	;

	private final String reason;
	private final String title;
	private final String content;
}
