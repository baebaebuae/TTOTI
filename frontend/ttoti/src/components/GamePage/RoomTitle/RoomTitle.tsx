import { useState } from 'react';
import styled from 'styled-components';

import RoomInfoModal from './RoomInfoModal';
import { RoomInfo } from 'src/types/RoomInfo';

interface RoomTitleProps {
  roomInfo: RoomInfo;
}

const RoomBox = styled.div`
	width: fit-content; /* 내용에 맞게 자동 조정 */
	height: 75px;
	padding-left: 15px;
	padding-right: 15px; /* 오른쪽 패딩 추가 */
	background-color: white;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* start를 flex-start로 수정 */
	justify-content: center;
	cursor: pointer;
`;

const FirstLine = styled.p`
	font-family: 'GmarketSans', sans-serif;
	font-weight: 300; /* Light font weight */
	font-size: 14px;
	margin: 0;
`;

const SecondLine = styled.p`
	font-family: 'GmarketSans', sans-serif;
	font-weight: normal; /* Regular font weight */
	font-size: 24px;
	margin: 0;
`;

const RoomTitle: React.FC<RoomTitleProps> = ({roomInfo}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// console.log(roomInfo.roomInfo.roomHostMemberName);
	// console.log(roomInfo.roomInfo.roomName);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<RoomBox onClick={openModal}>
				<FirstLine>{roomInfo.roomHostMemberName}의</FirstLine>
				<SecondLine>{roomInfo.roomName}</SecondLine>
			</RoomBox>

			{isModalOpen && (
				<RoomInfoModal
					onClose={closeModal}
				/>
			)}
		</>
	);
};

export default RoomTitle;
