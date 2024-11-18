import styled from 'styled-components';
import { RoomInfoProps } from 'src/types/RoomData';
import ColumnLogo from '@assets/icons/logo/column_logo.svg';
import { useState } from 'react';

const InfoRowContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	padding: 0px;
	gap: 17px;
	/* width: 190px; */
`;

const ImageWrapper = styled.div`
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors['submain']};
	border-radius: 50%;
`;

const ProfileImage = styled.img`
	width: 70px;
	height: 70px;
	object-fit: cover;
	border-radius: 50%;
`;

const InfoColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 0px;
	height: 80px;
	gap: 5px;
	max-width: 110px;
`;

const InfoText = styled.div<{ $field: string }>`
	font-family: 'GmarketSans';
	font-weight: ${({ $field }) => ($field === 'name' ? 'bold' : '300')};
	font-size: ${({ $field }) =>
		$field === 'participants' ? '14px' : $field === 'host' ? '16px' : '18px'};
	margin-top: ${({ $field }) => ($field === 'participants' ? '5px' : '0px')};
`;

const RoomInfo = ({
	hostName,
	roomName,
	currentParticipants,
	totalParticipants,
	imageURL,
}: RoomInfoProps) => {
	const [imgSrc, setImgSrc] = useState(imageURL);

	const handleImageError = () => {
		setImgSrc(ColumnLogo); // 이미지 로드 실패 시 기본 SVG로 대체
	};

	return (
		<InfoRowContainer>
			<ImageWrapper>
				<ProfileImage src={imgSrc} onError={handleImageError} />
			</ImageWrapper>
			<InfoColumnContainer>
				<InfoText $field="host">{hostName}님의</InfoText>
				<InfoText $field="name">{roomName}</InfoText>
				<InfoText $field="participants">
					참여 또띠 : {currentParticipants} / {totalParticipants}
				</InfoText>
			</InfoColumnContainer>
		</InfoRowContainer>
	);
};

export default RoomInfo;
