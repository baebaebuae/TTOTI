import styled from 'styled-components';
import GameButtons from '@components/common/buttons/GameButtons';
import { useNavigate } from 'react-router-dom';

const RoomInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 15px;
	width: 260px;
	height: 255px;
	border-radius: 12px;
	background: rgba(255, 255, 255, 0.5);
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	gap: 5px;
	width: 200px;
	margin-top: 20px;
`;

const ExplainText = styled.div`
	font-family: 'GmarketSans';
	font-weight: 300;
	font-size: 14px;
`;
const MainText = styled.div`
	font-family: 'GmarketSans';
	font-weight: 400;
	font-size: 16px;
`;

const DefaultRoomCard = () => {
	const navigate = useNavigate();
	const handleButton = () => {
		navigate('/room-create');
	};

	return (
		<RoomInfoWrapper>
			<ColumnContainer>
				<ExplainText>시작한 또띠가 없습니다!</ExplainText>
				<MainText>방을 만들고 초대해볼까요?</MainText>
			</ColumnContainer>
			<GameButtons color="success" onClick={handleButton}>
				방 만들기
			</GameButtons>
		</RoomInfoWrapper>
	);
};

export default DefaultRoomCard;
