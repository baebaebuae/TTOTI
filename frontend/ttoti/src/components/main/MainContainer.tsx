import { useState } from 'react';
import DefaultButtons from '@components/common/buttons/DefaultButtons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DescriptionModal from '@components/common/modals/DescriptionModal';
const MainWrapper = styled.div`
	display: flex;
	width: 360px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: absolute;
	bottom: 260px;
`;
const MainColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const MainButtons = styled(DefaultButtons)`
	color: black;
	font-weight: bold;
`;

const MainText = styled.div`
	font-family: 'GmarketSans';
	font-size: 16px;
	text-align: center;
	color: white;
	font-weight: 300;
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
const MainContainer = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();
	const goToCreate = () => {
		navigate('/room-create');
	};
	const goToList = () => {
		navigate('/room-list');
	};

	const openDesriptionModal = () => {
		setModalOpen(true);
	};
	const closeDesriptionModal = () => {
		setModalOpen(false);
	};
	return (
		<>
			{modalOpen && (
				<ModalBackground>
					<DescriptionModal onClose={closeDesriptionModal} />
				</ModalBackground>
			)}
			<MainWrapper>
				<MainText>원하는 또띠 서비스를 선택해주세요!</MainText>
				<MainColumn>
					{/* 임시 설명 버튼 생성  */}
					<MainButtons color="info" onClick={openDesriptionModal}>
						또띠 서비스 설명
					</MainButtons>

					<MainButtons color="point" onClick={goToCreate}>
						또띠 방 생성하기
					</MainButtons>
					<MainButtons color="success" onClick={goToList}>
						나의 또띠 입장하기
					</MainButtons>
				</MainColumn>
			</MainWrapper>
		</>
	);
};

export default MainContainer;
