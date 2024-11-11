// RoomInfoModal.tsx
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getApiClient } from '@services/apiClient';

interface RoomInfoModalProps {
	onClose: () => void;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = ({ onClose}) => {
	const [infoList, setInfoList] = useState<{ label: string; value: string }[]>(
		[],
	);
	const { id } = useParams<{ id: string }>();

	useEffect (() => {
		const getRoomDetail = async () => {
			try {
				const apiClient = getApiClient();
				const res = await apiClient.get(`/rooms/inprogress/detail/${id}`);
				const data = res.data.body
				console.log(data);
				setInfoList([
					{ label: '방 제목', value: data.roomName },
					{ label: '방장', value: data.roomHostMemberName },
					{ label: '또띠 인원', value: data.roomParticipants},
					{ label: '참여자', value: data.roomParticipantsNameList.join(',     ')},
					{ label: '종료 시간', value: data.roomFinishTime },
					{ label: '진행 기간', value: (`${data.roomStartDate} ~ ${data.roomFinishDate}`) },
				]);
			} catch (err) {
				console.error('Room Info Error :', err);
			}
		};

		getRoomDetail();
	}, [id])

	return (
		<Overlay onClick={onClose}>
			<Container onClick={(e) => e.stopPropagation()}>
				<HeaderContainer>
					<Title>방 정보</Title>
					<Description>또띠 방 정보를 확인해보세요!</Description>
				</HeaderContainer>

				<InfoList>
					{infoList.map((item, index) => (
						<InfoBox key={index}>
							<InfoLabel>{item.label}</InfoLabel>
							<InfoValue>{item.value}</InfoValue>
						</InfoBox>
					))}
				</InfoList>

				<ButtonContainer>
					<CloseButton onClick={onClose}>닫기</CloseButton>
				</ButtonContainer>
			</Container>
		</Overlay>
	);
};

export default RoomInfoModal;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Container = styled.div`
	display: grid;
	background-color: #f6f7fb;
	border-radius: 15px;
	width: 280px;
	padding: 30px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	z-index: 1001;
	gap: 17px;
`;

const HeaderContainer = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
`;

const Title = styled.h2`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: normal;
	color: #555;
	margin: 0;
`;

const Description = styled.h3`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin: 0;
`;

const InfoList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 0;
	list-style: none;
`;

const InfoBox = styled.li`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

const InfoLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	height: 17px;
	font-family: 'GmarketSans';
	font-size: 14px;
	font-weight: bold;
	line-height: 16px;
	color: white;
	background-color: #7984fc;
	padding-top: 4px;
	border-radius: 15px;
	margin-right: 15px;
`;

const InfoValue = styled.div`
	width: 185px;
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: normal;
	color: black;
	padding-top: 4px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 17px;
`;

const CloseButton = styled.button`
	width: 210px;
	height: 40px;
	background-color: #e1e9ef;
	font-family: 'LINESeed';
	font-size: 15px;
	font-weight: normal;
	color: black;
	border: none;
	border-radius: 6px;
	cursor: pointer;
`;
