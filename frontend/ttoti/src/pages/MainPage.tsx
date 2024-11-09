import MainContainer from '@components/main/MainContainer';
import styled from 'styled-components';
import ColumnLogo from '@assets/icons/logo/column_logo.svg?react';
import Clouds from '@assets/images/clouds.gif';

import MyPageIcon from '@components/main/MyPageIcon';

const MainPageWrapper = styled.div`
	position: relative; // 절대 위치 지정
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MyPageDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	padding-left: 70%;
	width: 100vw;
	top: 50px;
	z-index: 1;

	// 전체 화면 너비 일 경우 조절
	@media (min-width: 1024px) {
		padding-left: 30%;
	}
`;

const LogoDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	position: absolute;
	top: 70px;
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
	return (
		<MainPageWrapper>
			<CloudsImage src={Clouds} alt="cloudImage" />
			<MyPageDiv>
				<MyPageIcon />
			</MyPageDiv>
			<LogoDiv>
				<ColumnLogo />
			</LogoDiv>
			<MainContainer />
		</MainPageWrapper>
	);
};

export default MainPage;
