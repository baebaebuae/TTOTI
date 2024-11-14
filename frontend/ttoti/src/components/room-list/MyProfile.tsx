import styled from 'styled-components';
// import MyPageIcon from '@components/main/MyPageIcon';
import { useSelector } from 'react-redux';
import {
	selectMemberName,
	selectMemberProfile,
} from '@stores/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const MyProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const MyName = styled.div`
	font-family: 'GmarketSans';
	font-size: 16px;
	color: white;
`;

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-radius: 50%;
	width: 75px;
	height: 75px;
	cursor: pointer;
`;

const ProfileImage = styled.img`
	/* width: 90%; */
	/* height: 90%; */
	width: 65px;
	height: 65px;
	border-radius: 50%;
`;

const MyPageIcon = () => {
	const image = useSelector(selectMemberProfile);
	const navigate = useNavigate();

	const handleMyPageIcon = () => {
		navigate('/mypage');
	};
	return (
		<>
			<ProfileContainer>
				<ProfileImage src={image} onClick={handleMyPageIcon} />
			</ProfileContainer>
		</>
	);
};

const MyProfile = () => {
	const memberName = useSelector(selectMemberName);
	return (
		<MyProfileContainer>
			<MyPageIcon />
			<MyName>{memberName}</MyName>
		</MyProfileContainer>
	);
};

export default MyProfile;
