import styled from 'styled-components';

import { selectMemberProfile } from '@stores/slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-radius: 50%;
	width: 60px;
	height: 60px;
	cursor: pointer;
`;

const ProfileImage = styled.img`
	width: 90%;
	height: 90%;
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

export default MyPageIcon;
