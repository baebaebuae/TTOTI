import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { RoomData } from 'src/types/RoomData';
import RoomCarousel from '@components/room-list/RoomCarousel';
import NotificationModal from '@components/common/modals/NotificationModal';
import EnterCodeModal from '@components/common/modals/EnterCodeModal';
import GameButtons from '@components/common/buttons/GameButtons';

import RowLogo from '@assets/icons/logo/row_logo.svg?react';
import { getApiClient } from '@services/apiClient';

const RoomCreateWrapper = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalBackground = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
`;

const LogoDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	position: absolute;
	top: 70px;
	gap: 10px;
`;

const GoButton = styled(GameButtons)`
	background-color: ${({ theme }) => theme.colors['info']};
	width: 165px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	padding-top: 5px;
	position: absolute;
	top: 150px;
`;

const RoomListPage = () => {
	// Modal status 초기화
	const [rooms, setRooms] = useState<RoomData[]>([]);

	const [notificationModalData, setnotificationModalData] = useState({
		isOpen: false,
		roomId: 0,
	});
	const [enterModalOpen, setEnterModalOpen] = useState(false);

	useEffect(() => {
		const fetchRoomData = async () => {
			const apiClient = getApiClient();
			try {
				const res = await apiClient.get('/rooms/my');
				if (res.status === 200) {
					// console.log(res.data.body);
					setRooms(res.data.body);
				} else {
					console.log('get failed');
				}
			} catch (error) {
				console.error('API 요청 오류:', error);
			}
		};
		fetchRoomData();
	}, []);

	const openModal = (roomId: number) => {
		setnotificationModalData({ isOpen: true, roomId: roomId });
	};

	const closeModal = () => {
		setnotificationModalData({ isOpen: false, roomId: 0 });
	};

	const openEnterModal = () => {
		setEnterModalOpen(true);
	};

	const closeEnterModal = () => {
		setEnterModalOpen(false);
	};
	return (
		<RoomCreateWrapper>
			<LogoDiv>
				<RowLogo />
			</LogoDiv>
			{notificationModalData.isOpen && (
				<ModalBackground onClick={closeModal}>
					<NotificationModal
						onClose={closeModal}
						roomId={notificationModalData.roomId}
					/>
				</ModalBackground>
			)}
			{enterModalOpen && (
				<ModalBackground>
					<EnterCodeModal onClose={closeEnterModal} />
				</ModalBackground>
			)}
			<GoButton color="info" onClick={openEnterModal}>
				초대 코드로 입장
			</GoButton>
			<RoomCarousel rooms={rooms} handleModal={openModal} />
		</RoomCreateWrapper>
	);
};

export default RoomListPage;
