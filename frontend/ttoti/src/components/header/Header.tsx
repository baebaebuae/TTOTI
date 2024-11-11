import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import HomeButton from '@components/header/HomeButton';

const Container = styled.div`
	position: relative; // 절대 위치 지정
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HeaderWrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 40px;
	top: 30px;
	/* left: 10%; */
	margin-right: 250px;
	z-index: 1;
	transform: translateX(-50%); /* 중앙 정렬 */
`;

const Header = () => {
	return (
		<Container>
			<HeaderWrapper>
				<HomeButton />
			</HeaderWrapper>
			<Outlet />
		</Container>
	);
};

export default Header;
