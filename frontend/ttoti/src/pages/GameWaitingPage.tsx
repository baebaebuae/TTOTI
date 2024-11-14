// GameWaitingPage.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import getRoomData, {
	RoomMember,
	RoomData,
} from '@services/game-waiting-page/waitingRoomInfo'; // 파일 위치에 맞게 변경
import refreshIcon from '@assets/profiles/refreshIcon.png';
import addMemberIcon from '@assets/profiles/addMemberIcon.png';
import ProfileContainer from '@components/common/ProfileComponents';
import InviteModal from '@components/common/modals/InviteModal';
import RoomInfoModal from '@components/common/modals/RoomInfoModal';
import { getApiClient } from '@services/apiClient';
import { selectMemberProfile } from '@stores/slices/userSlice';
import { useSelector } from 'react-redux';
import RowLogo from '@assets/icons/logo/row_logo.svg?react';

const GameWaitingPage: React.FC = () => {
	// console.log('GameWaitingPage Mounted');
	const { id: roomId } = useParams<{ id: string }>();
	const [roomData, setRoomData] = useState<RoomData | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOverflow, setIsOverflow] = useState(false);
	// const [showNextButton, setShowNextButton] = useState(true);
	const [$isInviteModalOpen, setInviteModalOpen] = useState(false);
	const [$isRoomInfoModalOpen, setRoomInfoModalOpen] = useState(false);
	const [memberImage, setMemberImage] = useState<string>('');
	const navigate = useNavigate();

	const fetchRoomData = useCallback(async () => {
		if (!roomId) return;
		try {
			const data = await getRoomData(roomId);
			setRoomData(data);
			// console.log(data);
			if (data?.roomMemberInfo.currentParticipants > 3) {
				setIsOverflow(true);
			} else {
				setIsOverflow(false);
			}
		} catch (err) {
			console.error(err);
		} finally {
			// console.log('fetchRoomData fine');
		}
	}, [roomId]);

	const selectedMemberImage = useSelector(selectMemberProfile);

	useEffect(() => {
		fetchRoomData();
		setMemberImage(selectedMemberImage);
	}, [fetchRoomData, selectedMemberImage]);

	const openModal = () => setRoomInfoModalOpen(true);
	const closeModal = () => setRoomInfoModalOpen(false);
	const openInviteModal = () => setInviteModalOpen(true);
	const closeInviteModal = () => setInviteModalOpen(false);
	const handleNextButtonClick = () => navigate(`/character-select/${roomId}`);
	const handleRetryButtonClick = () => navigate(`/character-select/${roomId}`);

	// 새로고침 API 연결
	const getRefreshData = () => {
		const apiClient = getApiClient();
		const getRefreshApi = async () => {
			try {
				const res = await apiClient.get(`rooms/refresh/${roomId}`);
				if (res.status === 200) {
					setRoomData((prevRoomData) =>
						prevRoomData
							? { ...prevRoomData, roomMemberInfo: res.data.body }
							: prevRoomData,
					);
				}
			} catch (err) {
				console.error('Fail get Refresh Data : ', err);
			}
		};
		getRefreshApi();
	};
	// game-status 확인
	const getStatus = async () => {
		const apiClient = getApiClient();

		try {
			const res = await apiClient.get(`rooms/status/${roomId}`);
			if (res.status === 200) {
				const status = res.data.body;
				// console.log(status);
				return status;
			}
		} catch (err) {
			console.error('Failed get status Api ', err);
		}
		// default false
		return false;
	};

	const handleRefresh = async () => {
		// console.log('handle Refreshs');
		const nowStatus = await getStatus();
		// console.log('nowStatus is', nowStatus);
		if (nowStatus) {
			navigate(`/game/${roomId}`);
		} else {
			getRefreshData();
		}
	};

	let isDragging = false;
	let startX: number;
	let scrollLeft: number;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		startX = e.pageX - (containerRef.current?.offsetLeft || 0);
		scrollLeft = containerRef.current?.scrollLeft || 0;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - (containerRef.current?.offsetLeft || 0);
		const walk = (x - startX) * 1.5; // 스크롤 속도 조정
		if (containerRef.current)
			containerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUpOrLeave = () => {
		isDragging = false;
	};

  const handleName = (name: string) => {
    return name.length > 5 ? `${name.slice(0, 5)}...` : name;
  };

	return (
		<>
			<LogoDiv>
				<RowLogo />
			</LogoDiv>
			<ModalContainer>
				<HeaderContainer>
					<HeaderLeft>
						<ProfileContainer size="70px" src={memberImage} ready={false} />
					</HeaderLeft>
					<HeaderContent>
						<HeaderText>
							<HostName>{roomData?.hostName ?? '방장 정보 없음'}님의</HostName>
							<RoomName>{roomData?.roomName ?? '방 이름 없음'}</RoomName>
						</HeaderText>
						<RoomInfoWrapper onClick={openModal}>
							<RoomInfoText>방 정보</RoomInfoText>
							<RoomInfo>i</RoomInfo>
						</RoomInfoWrapper>
					</HeaderContent>
				</HeaderContainer>
				<SubText $isFull={roomData?.roomMemberInfo.currentParticipants === roomData?.roomMemberInfo.totalParticipants}>
				{roomData?.roomMemberInfo.currentParticipants === roomData?.roomMemberInfo.totalParticipants
					? '모든 인원이 또띠에 참여하였습니다!'
					: '아직 인원이 다 참여하지 않았습니다!'}
				</SubText>
				<ParticipantToolbar>
					<LeftToolbar>
						<RefreshIcon
							src={refreshIcon}
							alt="refreshIcon"
							onClick={handleRefresh}
							/>
						<MemberNumText>
							{roomData?.roomMemberInfo.currentParticipants} / {roomData?.roomMemberInfo.totalParticipants}
						</MemberNumText>
					</LeftToolbar>
					<MemberToolContainer>
						<RightToolbar onClick={openInviteModal}>
							<AddMemberText>초대하기</AddMemberText>
							<AddMemberIcon src={addMemberIcon} alt="addMemberIcon" />
						</RightToolbar>
					</MemberToolContainer>
				</ParticipantToolbar>
				<ParticipantsContainer
					ref={containerRef}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUpOrLeave}
					onMouseLeave={handleMouseUpOrLeave}
					$isOverflow={isOverflow}
				>
					<ParticipantBlank />
					{roomData?.roomMemberInfo.roomMemberList?.map(
						(member: RoomMember) => (
							<Participant key={member.name}>
								<ProfileContainer
									size="70px"
									src={member.profileImageUrl}
									ready={member.isReady}
								/>
								<ParticipantName>
									{handleName(member.name)}
								</ParticipantName>
							</Participant>
						),
					)}
					<ParticipantBlank />
				</ParticipantsContainer>
				<FooterContainer>
					{roomData?.isReady ? (
						<>
							<SelectedContainer>
								<CharacterImage
									src={`../images/characters/${roomData.animalProfileImageUrl}`}
									alt="animalProfileImage"
								/>
								<SelectedTextBox>
									<CompleteText>선택 완료!</CompleteText>
									<ToggleButton onClick={handleRetryButtonClick}>
										다시 선택
									</ToggleButton>
								</SelectedTextBox>
							</SelectedContainer>
						</>
					) : (
						<>
							<NextButtonInfo>캐릭터 선택으로 이동할까요?</NextButtonInfo>
							<NextButton onClick={handleNextButtonClick}>다음</NextButton>
						</>
					)}
				</FooterContainer>
			</ModalContainer>

			{roomData?.roomCode && $isInviteModalOpen && (
				<InviteModal roomCode={roomData?.roomCode} onClose={closeInviteModal} />
			)}

			{roomId && $isRoomInfoModalOpen && (
				<RoomInfoModal onClose={closeModal} roomId={roomId} />
			)}
		</>
	);
};

export default GameWaitingPage;

const LogoDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	position: absolute;
	top: 70px;
	gap: 25px;
`;

const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 310px;
	height: 395px;
	background-color: white;
	border-radius: 15px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -65%);
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 30px;
	width: 250px;
	height: 80px;
	background-color: #90d4b9;
	border-radius: 9px;
`;

const HeaderLeft = styled.div`
	margin-left: 10px;
`

const HeaderContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 165px;
	height: 70px;
`;

const HeaderText = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto 0 0 10px;
`;

const HostName = styled.div`
	font-family: 'GmarketSans';
	font-size: 14px;
	font-weight: 300;
`;

const RoomName = styled.div`
	font-family: 'GmarketSans';
	font-size: 24px;
	font-weight: normal;
`;

const RoomInfoWrapper = styled.div`
  display: flex;
	flex-direction: row;
	align-self: flex-end;
	cursor: pointer;
`

const RoomInfoText = styled.div`
	height: 15px;
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: normal;
	align-self: end;
	color: white;
	margin-right: 5px;
`

const RoomInfo = styled.div`
	font-family: 'GmarketSans';
	font-size: 12px;
	font-weight: Bold;
	color: #90d4b9;
	text-align: center;
	line-height: 21px;
	width: 17.5px;
	height: 17.5px;
	background-color: white;
	border-radius: 50%;
`;

const SubText = styled.div<{ $isFull: boolean }>`
  margin-top: 10px;
  font-family: 'LINESeed';
  font-size: 16px;
  font-weight: normal;
  color: ${({ $isFull }) => ($isFull ? '#67c431' : '#ff6430')};
`;

const ParticipantToolbar = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 27px;
`;

const LeftToolbar = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`

const RefreshIcon = styled.img`
	margin-left: 11px;
	width: 19px;
	height: 19px;
	cursor: pointer;
`;

const MemberNumText = styled.div`
	display: flex;
	align-self: end;
	height: 20px;
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: 300;
`;

const MemberToolContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
`;

const RightToolbar = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	cursor: pointer;
`

const AddMemberText = styled.div`
	align-self: end;
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: bold;
	color: #7984fc;
`

const AddMemberIcon = styled.img`
	width: 19px;
	height: 19px;
	margin-right: 10px;
`;

const ParticipantsContainer = styled.div<{ $isOverflow: boolean }>`
	display: flex;
	align-items: center;
	justify-content: ${({ $isOverflow }) =>
		$isOverflow ? 'flex-start' : 'center'};
	width: 100%;
	height: 100px;
	overflow-x: auto;
	white-space: nowrap;
	gap: 10px;
	background-color: #e1e9ef;

	&:active {
		cursor: grabbing;
	}
`;

const ParticipantBlank = styled.div`
	width: 12px;
	height: auto;
`;

const Participant = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ParticipantName = styled.div`
	margin-top: 5px;
	font-family: 'SB어그로';
	font-size: 12px;
	font-weight: 300;
`;

const FooterContainer = styled.footer`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 10px;
`;

const NextButtonInfo = styled.div`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: 300;
`;

const NextButton = styled.button`
	padding: 10px;
	width: 115px;
	height: 35px;
	font-family: 'GmarketSans';
	font-size: 16px;
	font-weight: bold;
	background-color: #1b95ec;
	color: white;
	border: none;
	border-radius: 15px;
	cursor: pointer;
`;

const SelectedContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 228px;
	height: 74px;
	gap: 31px;
`;

const CharacterImage = styled.img`
	padding-left: 8px;
	padding-right: 8px;
	width: 30%;
`;

const SelectedTextBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 110px;
`;

const CompleteText = styled.p`
	margin-top: 5px;
	margin-bottom: 5px;
	font-family: 'GmarketSans';
	font-size: 24px;
	font-weight: bold;
	color: #67c431;
`;

const ToggleButton = styled.button`
	align-self: center;
	margin-top: 5px;
	padding: 8px;
	width: 90px;
	height: 30px;
	font-family: 'GmarketSans';
	font-size: 16px;
	font-weight: bold;
	background-color: #ff6430;
	color: white;
	border: none;
	border-radius: 15px;
	cursor: pointer;
`;
