// RoomInfoModal.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getApiClient } from '@services/apiClient';
import { useNavigate } from 'react-router-dom';


interface RoomInfoModalProps {
	onClose: () => void;
	roomId: string;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = ({ onClose, roomId }) => {
	const [infoList, setInfoList] = useState<{ label: string; value: string, update: boolean }[]>(
		[],
	);
	const [$isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState('')

	useEffect(() => {
		const getRoomDetail = async () => {
			try {
				const apiClient = getApiClient();
				const res = await apiClient.get(`/rooms/pending/detail/${roomId}`);
	
				if (res.status === 200) {
					const data = res.data.body;
	
					setInfoList([
						{ label: '방 제목', value: data.roomName, update: false },
						{ label: '방장', value: data.roomHostMemberName, update: false },
						{ label: '최대 인원', value: data.roomTotalParticipants, update: false },
						{ label: '현재 인원', value: data.roomCurrentParticipants, update: false },
						{ label: '종료 시간', value: data.roomFinishTime, update: false },
						{ label: '진행 기간', value: data.roomPeriod, update: false },
					]);
				}
			} catch (err) {
				console.error('Room Info Error :', err);
			}
		};
		getRoomDetail();
	}, [roomId])

	const navigate = useNavigate();

	const leaveRoom = async () => {
		const apiClient = getApiClient();
		try {
			const res = await apiClient.delete(`/rooms/${roomId}`);
			if (res.status === 200) {
				// console.log('게임 나가기 성공');
				navigate('/');
			}
		} catch (err) {
			console.error('Leave Room Error : ', err);
		}
	};

	const handleUpdate = async () => {
		if (infoList[0].value.length > 8) {
			setError('방 제목은 8자 이하여야 합니다.')
		} else if (Number(infoList[2].value) < 4 || Number(infoList[2].value) > 8) {
			setError('최대 인원은 최소 4명, 최대 8명 입니다.')
		} else if (Number(infoList[5].value) < 1 || Number(infoList[5].value) > 14) {
			setError('진행 기간은 최소 1주, 최대 14주 입니다.')
		} else {
			setError('')
			if ($isEditing) {
				const updatedData = {
					name: infoList.find(item => item.label === '방 제목')?.value || '',
					participants: infoList.find(item => item.label === '최대 인원')?.value || '',
					period: infoList.find(item => item.label === '진행 기간')?.value || '',
				};
		
				const apiClient = getApiClient();
				try {
					const res = await apiClient.patch(`/rooms/${roomId}`, updatedData);
					if (res.status === 200) {
						// console.log('방 정보 수정 성공');
					}
				} catch (error) {
					console.error('방 정보 수정 Error :', error);
				}
		
				setInfoList(prevInfoList =>
					prevInfoList.map(item =>
						['방 제목', '최대 인원', '진행 기간'].includes(item.label)
							? { ...item, update: false }
							: item
					)
				);
	
				setIsEditing(false)
			} else {
				setInfoList(prevInfoList =>
					prevInfoList.map(item =>
						['방 제목', '최대 인원', '진행 기간'].includes(item.label)
							? { ...item, update: true }
							: item
					)
				);
				setIsEditing(true)
			}
		}
	};
	

	const handleChange = (index: number, newValue: string) => {
		setInfoList(prevInfoList =>
			prevInfoList.map((item, i) => (i === index ? { ...item, value: newValue } : item))
		);
	};
	
	return (
		<ModalOverlay onClick={onClose}>
			<ModalContainer onClick={(e) => e.stopPropagation()}>
				<HeaderContainer>
					<Title>방 정보</Title>
					<Description>또띠 방 정보를 확인해보세요!</Description>
				</HeaderContainer>

				<InfoList>
					{infoList.map((item, index) => (
						<InfoBox key={index}>
							<InfoLabel>{item.label}</InfoLabel>
							<InfoValue>
								{item.update ? (
									<InputBox
										type="text"
										value={item.value}
										onChange={(e) => handleChange(index, e.target.value)}
									/>
								) : (
									item.value
								)}
							</InfoValue>
						</InfoBox>
					))}
					<ErrorWrapper>{error}</ErrorWrapper>
				</InfoList>

				<ButtonContainer>
					<MainButtonWrapper>
						<UpdateButton onClick={handleUpdate} $isEditing={$isEditing}>
							{$isEditing ? '수정완료' : '정보수정'}
						</UpdateButton>
						<LeaveButton onClick={leaveRoom}>방 나가기</LeaveButton>
					</MainButtonWrapper>
					<CloseButton onClick={onClose}>닫기</CloseButton>
				</ButtonContainer>
			</ModalContainer>
		</ModalOverlay>
	);
};

export default RoomInfoModal;

const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
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
	height: 185px;
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

const ErrorWrapper = styled.div`
	align-self: center;
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: bold;
	color: #ff6430;
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 17px;
`;

const MainButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 210px;
`

const InputBox = styled.input`
	width: 185px;
	height: 8.4374px;
	font-family: 'LINESeed';
	font-size: 16px;
	color: black;
	padding-top: 4px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const UpdateButton = styled.button<{ $isEditing: boolean }>`
	width: 100px;
	height: 40px;
	background-color: ${({ $isEditing }) => ($isEditing ? '#67c431' : '#7984fc')};
	color: white;
	font-family: 'LINESeed';
	font-size: 15px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
`;

const LeaveButton = styled.button`
	width: 100px;
	height: 40px;
	background-color: #ff6430;
	font-family: 'LINESeed';
	font-size: 15px;
	font-weight: normal;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
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
