import styled from 'styled-components';
import ProfileContainer from '@components/common/ProfileComponents';
import { RoomInfo } from 'src/types/RoomInfo';
import ArrowIcon from '@assets/icons/large_arrow.svg?react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// 정보 arrow 구현
const ArrowContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;

const ArrowText = styled.div`
	font-family: 'GmarketSans';
	font-size: 16px;
	color: white;
`;

export const MyArrow = () => {
	return (
		<ArrowContainer>
			<ArrowText>나의 카드</ArrowText>
			<ArrowIcon />
		</ArrowContainer>
	);
};

export const ManitoArrow = () => {
	return (
		<ArrowContainer>
			<ArrowText>나의 마니또 카드</ArrowText>
			<ArrowIcon />
		</ArrowContainer>
	);
};
export const ManitiArrow = () => {
	return (
		<ArrowContainer>
			<ArrowText>나의 마니띠 카드</ArrowText>
			<ArrowIcon />
		</ArrowContainer>
	);
};

// Card 구현

const CardWrapper = styled.div`
	width: 150px;
	height: 190px;
	perspective: 1000px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Card = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
	padding: 7px 8px;
	box-sizing: border-box;
	border: 5px solid black;
	border-radius: 16px;
	background-color: white;
`;

const CardFace = styled.div<{ color: string }>`
	width: 124px;
	height: 166px;
	border-radius: 12px;
	background-color: ${({ theme, color }) => theme.colors[color]};
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	backface-visibility: hidden;
	position: absolute;
`;

// 앞 뒤 카드 설정
const FrontFace = styled(CardFace)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FrontImg = styled.img`
	width: 124px;
	height: 166px;
	object-fit: cover;
`;

const FrontText = styled.div`
	position: absolute;
	font-family: 'GmarketSans';
	font-size: 26px;
	font-weight: bold;
	color: white;
	text-align: center;
	width: 100%;
`;
const BackFace = styled(CardFace)`
	transform: rotateY(180deg);
`;

const PlayText = styled.div`
	color: white;
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
	width: 124px;
	padding-left: 20px;
	margin-top: 10px;
`;

const MyName = styled.div`
	color: white;
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
`;

const MyProfileColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin-top: 18px;
`;

interface MyCardProps {
	myPlay: string;
	infoData: RoomInfo;
}

export const MyCard = ({ myPlay, infoData }: MyCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const color = myPlay === 'manito' ? 'manito' : 'submain';
	const play = myPlay === 'manito' ? '마니또' : '마니띠';
	const data = infoData['ttotiMatchInfo'];
	const imgUrl =
		myPlay === 'manito'
			? `../images/characters/${data.myAnimalImageUrl}`
			: data.myProfileImageUrl;

	const name = myPlay === 'manito' ? data.myAnimalName : data.myName;
	// console.log(data);
	return (
		<CardWrapper onClick={() => setIsFlipped((prev) => !prev)}>
			{/* 뒷면 */}
			<Card
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.9 }}
			>
				<FrontFace color={color}>
					<FrontImg src={`../images/cards/${myPlay}.png`} />
					<FrontText>또띠</FrontText>
				</FrontFace>

				<BackFace color={color}>
					<PlayText>{play}</PlayText>
					<MyProfileColumn>
						<ProfileContainer src={imgUrl} size="70px" ready={false} />
						<MyName>{name}</MyName>
					</MyProfileColumn>
				</BackFace>
			</Card>
		</CardWrapper>
	);
};

export const TtotiCard = ({ myPlay, infoData }: MyCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const color = myPlay === 'manito' ? 'manito' : 'submain';
	const play = myPlay === 'manito' ? '마니또' : '마니띠';
	const data = infoData['ttotiMatchInfo'];
	// console.log(data);
	const imgUrl =
		myPlay === 'manito'
			? `../images/characters/${data.myManittoAnimalImageUrl}`
			: data.myManitiProfileImageUrl;

	const name =
		myPlay === 'manito' ? data.myManittoAnimalName : data.myManitiMemberName;

	return (
		<CardWrapper onClick={() => setIsFlipped((prev) => !prev)}>
			{/* 뒷면 */}
			<Card
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.9 }}
			>
				<FrontFace color={color}>
					<FrontImg src={`../images/cards/${myPlay}.png`} />
					<FrontText>또띠</FrontText>
				</FrontFace>

				<BackFace color={color}>
					<PlayText>{play}</PlayText>
					<MyProfileColumn>
						<ProfileContainer src={imgUrl} size="70px" ready={false} />
						<MyName>{name}</MyName>
					</MyProfileColumn>
				</BackFace>
			</Card>
		</CardWrapper>
	);
};
