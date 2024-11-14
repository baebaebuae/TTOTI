import styled from 'styled-components';
import { useState } from 'react';
import ColumnLogo from '@assets/icons/logo/column_logo.svg?react';
import Clouds from '@assets/images/clouds.gif';

import DescriptionModal from '@components/common/modals/DescriptionModal';
import MainContainer from '@components/main/MainContainer';
import MyPageIcon from '@components/main/MyPageIcon';

const MainPageWrapper = styled.div`
	position: relative; // 절대 위치 지정
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	position: absolute;
	top: 70px;
`;

const ModalBackground = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	left: 0;
	top: 0;
`;

const MyPageDiv = styled.div`
	position: absolute;
	height: 40px;
	top: 50px;
	margin-left: 280px;
	z-index: 1;
	transform: translateX(-50%);
`;

const CloudsImage = styled.img`
	position: absolute;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
	object-fit: cover;
	z-index: -1;
`;

const MainPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeDescriptionModal = () => {
		setIsOpen(false); // 모달 닫기
	};

	const handleModal = () => {
		setIsOpen(true);
	};

	return (
		<MainPageWrapper>
			{isOpen && (
				<ModalBackground>
					<DescriptionModal onClose={closeDescriptionModal} />
				</ModalBackground>
			)}
			<CloudsImage src={Clouds} alt="cloudImage" />
			<MyPageDiv>
			<MyPageIcon handleModal={handleModal} />
			</MyPageDiv>

			<LogoDiv>
				<ColumnLogo />
			</LogoDiv>
			<MainContainer />
		</MainPageWrapper>
	);
};

export default MainPage;
