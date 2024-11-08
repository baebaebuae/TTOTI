import { useState } from 'react';
import styled from 'styled-components';
import RoomInfoModal from '@components/common/modals/RoomInfoModal';

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

const RoomTitle = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<RoomBox onClick={openModal}>
				<FirstLine>정진영의</FirstLine>
				<SecondLine>99NULL</SecondLine>
			</RoomBox>

			{isModalOpen && (
				<RoomInfoModal
					onClose={closeModal}
					roomId={'4'} // roomId 임시 전달
				/>
			)}
		</>
	);
};

export default RoomTitle;
