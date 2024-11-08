import DefaultButtons from '@components/common/buttons/DefaultButtons';
import styled from 'styled-components';
import Kakao from '@assets/icons/kakao.svg?react';
import { requestFcmToken } from '@utils/notification/settingFCM';

const LoginWrapper = styled.div`
	display: flex;
	width: 360px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: absolute;
	bottom: 340px;
`;
const LoginText = styled.div`
	width: 240px;
	font-family: 'GmarketSans';
	font-size: 16px;
	text-align: center;
	color: white;
	font-weight: 300;
`;

const LoginButton = styled(DefaultButtons)`
	font-weight: bold;
	justify-content: flex-start;
`;

const LoginButtonText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 140px;
`;

const API_URL = import.meta.env.VITE_URL;
const LoginContainer = () => {
	const handleLogin = async () => {
		// 화면 새로고침
		console.log('check');
		try {
			window.location.href = `${API_URL}/oauth/kakao`;
			// console.log
		} catch (error) {
			console.log('Redirect Error:', error);
		} finally {
			requestFcmToken();
		}
	};
	return (
		<LoginWrapper>
			<LoginText>나만의 특별한 친구를 만나기 위해 로그인이 필요해요!</LoginText>
			<LoginButton color="login" onClick={handleLogin}>
				<Kakao />
				<LoginButtonText>카카오 로그인</LoginButtonText>
			</LoginButton>
		</LoginWrapper>
	);
};

export default LoginContainer;
