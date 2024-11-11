import styled from 'styled-components';
import LoginContainer from '@components/main/LoginContainer';
import ColumnLogo from '@assets/icons/logo/column_logo.svg?react';
import Clouds from '@assets/images/clouds.gif';

const LoginWrapper = styled.div`
	position: relative;
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
const CloudsImage = styled.img`
	position: absolute;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
	object-fit: cover;
	z-index: -1;
`;

const LoginPage = () => {
	if ('serviceWorker' in navigator) {
		if (
			window.location.pathname === '/login' ||
			window.location.pathname === '/api/v1/ttoti/oauth/kakao'
		) {
			navigator.serviceWorker.ready.then((registration) => {
				registration.unregister();
			});
		}
	}

	return (
		<LoginWrapper>
			<CloudsImage src={Clouds} alt="cloudImage" />
			<LogoDiv>
				<ColumnLogo />
			</LogoDiv>
			<LoginContainer />
		</LoginWrapper>
	);
};

export default LoginPage;
