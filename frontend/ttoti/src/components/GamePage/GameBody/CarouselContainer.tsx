// CarouselContainer.tsx
import React from 'react';
import styled from 'styled-components';
import ProfileContainer from '@components/common/ProfileComponents';
import heartArrowIcon from '@assets/icons/heartArrowIcon.png';

import { RoomInfo } from 'src/types/RoomInfo';

interface CarouselContainerProps {
	page: number;
	roomInfo: RoomInfo;
}

const Container = styled.div<{ $page: number }>`
	width: 280px;
	height: 150px;
	background-color: ${({ $page }) => ($page === 1 ? '#90D4B9' : '#e37c7d')};
	border-radius: 12px;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: 'LineSeed';
	color: white;
`;

const TitleText = styled.div`
	font-weight: 300;
	font-size: 16px;
`;

const NameText = styled.div`
	font-weight: normal;
	font-size: 20px;
	margin-bottom: 8px;
`;

const ProfileImagesContainer = styled.div`
	display: flex;
	gap: 10px;
`;

const HeartIcon = styled.img`
	width: 64px; // 아이콘 크기 조절
	height: 64px;
`;

const CarouselContainer: React.FC<CarouselContainerProps> = ({
	page,
	roomInfo,
}) => {
	const isManito = page === 0;
	const title = isManito ? '나의 마니또' : '나의 마니띠';
	const name = isManito
		? roomInfo.ttotiMatchInfo.myManittoAnimalName
		: roomInfo.ttotiMatchInfo.myManitiMemberName;

	const manittoImageUrl = `../images/characters/${roomInfo.ttotiMatchInfo.myManittoAnimalImageUrl}`;
	console.log(roomInfo);
	// console.log(`내 마니또 프로필 이름 : ${roomInfo.ttotiMatchInfo.myManittoAnimalName}`);
	// console.log(`내 마니또 프로필 이미지 : ${roomInfo.ttotiMatchInfo.myManittoAnimalImageUrl}`);
	// console.log(`내 마니띠 프로필 이름 : ${roomInfo.ttotiMatchInfo.myManitiMemberName}`);
	// console.log(`내 마니띠 프로필 이미지 : ${roomInfo.ttotiMatchInfo.myManitiProfileImageUrl}`);

	return (
		<Container $page={page}>
			<TitleText>{title}</TitleText>
			<NameText>{name}</NameText>
			<ProfileImagesContainer>
				{isManito ? (
					<>
						<ProfileContainer
							src={roomInfo.ttotiMatchInfo.myProfileImageUrl}
							size="64px"
							ready={false}
						/>
						<HeartIcon src={heartArrowIcon} alt="Heart Arrow Icon" style={{transform: 'scaleX(-1)'}}/>
						<ProfileContainer src={manittoImageUrl} size="64px" ready={false} />
					</>
				) : (
					<>
						<ProfileContainer
							src={roomInfo.ttotiMatchInfo.myProfileImageUrl}
							size="64px"
							ready={false}
						/>
						<HeartIcon src={heartArrowIcon} alt="Heart Arrow Icon"/>
						<ProfileContainer
							src={roomInfo.ttotiMatchInfo.myManitiProfileImageUrl}
							size="64px"
							ready={false}
						/>
					</>
				)}
			</ProfileImagesContainer>
		</Container>
	);
};

export default CarouselContainer;
