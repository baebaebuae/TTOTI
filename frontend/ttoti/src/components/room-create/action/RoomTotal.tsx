import styled from 'styled-components';

import {
	RoomInputContainer,
	RoomInputColumn,
	RoomInputExplain,
	RoomInputTitle,
} from '@components/room-create/action/RoomInputCard';

import GameButtons from '@components/common/buttons/GameButtons';
import postRoomCreate from '@services/apiRoomClient';
import { useNavigate } from 'react-router-dom';

const RoomData = styled(RoomInputTitle)`
	width: 65px;
	font-weight: 400;
`;

const RoomInputData = styled(RoomInputExplain)`
	font-size: 16px;
	font-weight: bold;
`;

const RoomRowContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	gap: 20px;
	margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 215px;
`;

interface RoomTotalProps {
	formData: {
		name: string;
		participants: number;
		period: number;
		finishTime: string;
	};
}

const RoomTotal = ({ formData }: RoomTotalProps) => {
	// 최종 입력 데이터 확인용 콘솔
	console.log('Room-Input TotalData: ', formData);
	const navigate = useNavigate();
	const totalData = [
		{ title: '방 이름', value: formData.name },
		{ title: '참여 인원', value: formData.participants },
		{ title: '진행 기간', value: formData.period },
		{ title: '종료 시간', value: formData.finishTime },
	];

	const postCreateAPI = async () => {
		console.log('click');
		const roomId = await postRoomCreate({ formData });
		if (roomId) {
			// 임시로 메인 페이지 이동
			// console.log(result);
			navigate(`/game-waiting/${roomId}`);
		}
	};
	return (
		<RoomInputContainer>
			<RoomInputColumn>
				{totalData.map((data, index) => (
					<RoomRowContainer key={index}>
						<RoomData>{data.title}</RoomData>
						<RoomInputData>{data.value}</RoomInputData>
					</RoomRowContainer>
				))}
			</RoomInputColumn>
			<ButtonContainer>
				<GameButtons color="info" onClick={postCreateAPI}>
					확인
				</GameButtons>
			</ButtonContainer>
		</RoomInputContainer>
	);
};

export default RoomTotal;
