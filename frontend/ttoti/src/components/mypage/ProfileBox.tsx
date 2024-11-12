import ProfileContainer from '@components/common/ProfileComponents';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectMemberName,
	toggleModal,
	selectIsModalOpen,
	selectMemberProfile,
} from '../../stores/slices/userSlice';
import EditNameIcon from '@assets/icons/edit_name.svg?react';
import NameChangeModal from './NameChangeModal';

const ProfileWrapper = styled.div`
  width: 130px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  font-family: 'LINESeed';
  font-weight: bold;
  font-size: 15px;
  color: white;
`;

const ProfileBox = () => {
	const dispatch = useDispatch();
	const userName = useSelector(selectMemberName);
	const isModalOpen = useSelector(selectIsModalOpen);
	const myProfile = useSelector(selectMemberProfile);

	return (
		<ProfileWrapper>
			<ProfileContainer src={myProfile} size="75px" ready={false} />
			<UserBox>
				<UserName>{userName}</UserName>
				<EditNameIcon
					style={{ marginLeft: 3, marginTop: 3 }}
					onClick={() => dispatch(toggleModal())}
				/>
			</UserBox>
			{isModalOpen && <NameChangeModal />}
		</ProfileWrapper>
	);
};

export default ProfileBox;
