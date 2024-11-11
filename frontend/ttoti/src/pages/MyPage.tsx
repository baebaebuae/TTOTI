import ProfileBox from "@components/mypage/ProfileBox";
import RoomInfo from "@components/mypage/RoomInfo";
import styled from "styled-components";


const MyPageWrapper = styled.div`
	width:100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MyPageBox = styled.div`
	display: flex;
	width: 360px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;

`


const MyPageHeader = styled.div`
	margin-top: 10px;
	padding: 30px;
`;

const ProfileBoxWrapper = styled.div`
`;


const MyPage = () => {
	return <MyPageWrapper>
		<MyPageBox>
      <MyPageHeader>
       	<ProfileBoxWrapper>
         	<ProfileBox />
       	</ProfileBoxWrapper>
      </MyPageHeader>
			<RoomInfo />
		</MyPageBox>
	</MyPageWrapper>;
};

export default MyPage;
