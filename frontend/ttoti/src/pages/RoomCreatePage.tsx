import styled from 'styled-components';

import RowLogo from '@assets/icons/logo/row_logo.svg?react';
import CreateCard from '@components/room-create/CreateCard';

const RoomCreateWrapper = styled.div`
	position: relative;
	background-color: rgba(0, 0, 0, 0.5);
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
const RoomCreatePage = () => {
	return (
		<RoomCreateWrapper>
			<LogoDiv>
				<RowLogo />
			</LogoDiv>
			<CreateCard />
		</RoomCreateWrapper>
	);
};

export default RoomCreatePage;
