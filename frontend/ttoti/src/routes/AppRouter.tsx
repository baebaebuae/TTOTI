import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import fetchUserInfo from '@hooks/fetchUserInfo';
import { selectMemberId } from '@stores/slices/userSlice';
import { useAppdispatch } from '@stores/index';
// 배경화면 import
import LoginBackground from '@assets/images/login.gif';
import MainBackground from '@assets/images/main.gif';
import MypageBackground from '@assets/images/mypage.png';

import CharacterSelect from '@pages/CharacterSelectPage';
import CreditPage from '@pages/CreditPage';
import GamePage from '@pages/GamePage';
import GameWaitingPage from '@pages/GameWaitingPage';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import MyPage from '@pages/MyPage';
import RoomCreatePage from '@pages/RoomCreatePage';
import RoomListPage from '@pages/RoomListPage';
import Auth from '@pages/Auth';

// Test Page import
import HoseaKim from '@pages/test/HoseaKim';
import Jignonne from '@pages/test/Jignonne';
import MooMoo from '@pages/test/MooMoo';

const Background = styled.div`
	position: absolute;
	background: linear-gradient(#1b95ec 23%, #2c96d0 47%, #90d4b9 100%);
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	width: 100vw;
	height: 100vh;
	z-index: -1;
`;

const BackgroundImage = styled.img`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 380px;
	object-fit: cover;
	z-index: -1;
`;

const AppRouter = () => {
	const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
		undefined,
	);

	const [loggedIn, setLoggedIn] = useState(
		!!localStorage.getItem('accessToken'),
	);

	const location = useLocation();

	const RequireAuth = ({ children }: { children: JSX.Element }) => {
		const dispatch = useAppdispatch();
		const memberId = useSelector(selectMemberId); // Redux에서 사용자 ID 확인

		const isLoggedIn = !!localStorage.getItem('accessToken');

		// member 정보 조회
		useEffect(() => {
			// 로그인된 유저의 멤버 아이디가 저장되어있지 않았다면
			if (isLoggedIn && !memberId) {
				// 로그인 상태지만 사용자 정보가 없을 때 fetchUserInfo 호출
				dispatch(fetchUserInfo());
			}
		}, [isLoggedIn, memberId, dispatch]);

		if (!isLoggedIn) {
			setLoggedIn(false);
			return <Navigate replace to="/login" />;
		} else {
			fetchUserInfo();
		}
		return children;
	};

	useEffect(() => {
		const pathname = location.pathname.split('/')[1];
		if (pathname === 'login') {
			setBackgroundImage(LoginBackground);
		} else if (pathname === 'mypage') {
			setBackgroundImage(MypageBackground);
		} else {
			setBackgroundImage(MainBackground);
		}
	}, [location.pathname]);

	return (
		<>
			<Background />
			{backgroundImage && (
				<>
					<BackgroundImage src={backgroundImage} alt="backgroundImage" />
				</>
			)}
			<Routes>
				{/* 메인 라우트 */}
				<Route
					path="/"
					element={
						<RequireAuth>
							<MainPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/login"
					element={!loggedIn ? <LoginPage /> : <Navigate replace to="/" />}
				/>
				<Route
					path="/room-create"
					element={
						<RequireAuth>
							<RoomCreatePage />
						</RequireAuth>
					}
				/>
				<Route
					path="/room-list"
					element={
						<RequireAuth>
							<RoomListPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/game-waiting/:id"
					element={
						<RequireAuth>
							<GameWaitingPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/game/:id"
					element={
						<RequireAuth>
							<GamePage />
						</RequireAuth>
					}
				/>
				<Route
					path="/character-select"
					element={
						<RequireAuth>
							<CharacterSelect />
						</RequireAuth>
					}
				/>
				<Route
					path="/mypage"
					element={
						<RequireAuth>
							<MyPage />
						</RequireAuth>
					}
				/>
				<Route path="/landing" element={<LandingPage />} />
				<Route
					path="/credit"
					element={
						<RequireAuth>
							<CreditPage />
						</RequireAuth>
					}
				/>
				{/* Social Login */}
				<Route path="/callback" element={<Auth />} />
				{/* 테스트 페이지 라우트  */}
				<Route path="/hoseakim" element={<HoseaKim />} />
				<Route path="/jignonne" element={<Jignonne />} />
				<Route path="/moomoo" element={<MooMoo />} />
			</Routes>
		</>
	);
};

export default AppRouter;
