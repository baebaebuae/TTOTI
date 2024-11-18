package kr.co.ttoti.backend.domain.ttoti.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AnimalPersonality {

	AFFECTIONATE("상냥한"),
	BRAVE("용감한"),
	CUDDLY("포근한"),
	DARING("대담한"),
	ELEGANT("우아한"),
	FEISTY("쾌활한"),
	GENTLE("부드러운"),
	GRACEFUL("기품 있는"),
	HUMBLE("겸손한"),
	JOLLY("유쾌한"),
	LIVELY("활기찬"),
	MAJESTIC("위엄 있는"),
	NOBLE("고귀한"),
	PLAYFUL("장난스러운"),
	PROUD("자부심 있는"),
	QUIRKY("개성 있는"),
	SHY("수줍은"),
	SILLY("엉뚱한"),
	SINCERE("성실한"),
	SLEEK("날렵한"),
	SPIRITED("열정적인"),
	TENDER("다정한"),
	TIMID("소심한"),
	TRUSTWORTHY("믿음직한"),
	VIBRANT("생기 넘치는"),
	BOUNCY("통통 튀는"),
	CHATTY("수다스러운"),
	CHEEKY("건방진"),
	CLUMSY("어설픈"),
	CRAFTY("꾀 많은"),
	DASHING("멋진"),
	DAZZLING("눈부신"),
	DIZZY("빙글빙글 도는"),
	DREAMY("몽환적인"),
	FLUFFY("복슬복슬한"),
	GOOFY("엉뚱한"),
	JAZZY("화려한"),
	LOOPY("이상한"),
	NIFTY("솜씨 좋은"),
	PEPPY("활기찬"),
	RASCALLY("장난꾸러기"),
	SASSY("뻔뻔한"),
	SNOOZY("졸린"),
	SPUNKY("열정 넘치는"),
	SQUIRRELY("활발한"),
	TWINKLY("반짝거리는"),
	WAGGLY("꼬리 흔드는")
	;

	private final String description;

	public static AnimalPersonality getRandomPersonality() {
		AnimalPersonality[] personalities = values();
		return personalities[new java.util.Random().nextInt(personalities.length)];
	}
}
