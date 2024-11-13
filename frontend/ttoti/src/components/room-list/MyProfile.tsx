import styled from 'styled-components';
import MyPageIcon from '@components/main/MyPageIcon';
import { useSelector } from 'react-redux';
import { selectMemberName } from '@stores/slices/userSlice';

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
