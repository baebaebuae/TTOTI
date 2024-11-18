import ProfileBox from '@components/mypage/ProfileBox';
import RoomInfo from '@components/mypage/RoomInfo';
import styled from 'styled-components';
import MypageBackground from '@assets/images/mypage.gif';

const MyPageWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const MyPageBox = styled.div`
	display: flex;
	width: 360px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
`;

const MyPageHeader = styled.div`
	margin-top: 10px;
	padding: 30px;
`;

const BackgroundImage = styled.img`
	position: absolute;
	margin-top: 360px;
	left: 50%;
	transform: translateX(-50%);
	width: 380px;
	object-fit: cover;
	z-index: -1;
`;

const ProfileBoxWrapper = styled.div``;

const MyPage = () => {
	return (
		<MyPageWrapper>
			<MyPageBox>
				<BackgroundImage src={MypageBackground} alt="backgroundImage" />
				<MyPageHeader>
					<ProfileBoxWrapper>
						<ProfileBox />
					</ProfileBoxWrapper>
				</MyPageHeader>
				<RoomInfo />
			</MyPageBox>
		</MyPageWrapper>
	);
};

export default MyPage;
