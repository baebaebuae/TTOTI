import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	RoomInputContainer,
	RoomInputColumn,
	RoomInputExplain,
	RoomInputTitle,
} from '@components/room-create/action/RoomInputCard';

import PlusIcon from '@assets/icons/plus_icon.svg?react';
import MinusIcon from '@assets/icons/minus_icon.svg?react';

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
	width: 215px;
`;

const CountContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 45px;
	padding-top: 5px;
	background-color: ${({ theme }) => theme.colors['background']};
	border-radius: 100%;
	font-family: 'LINESeed';
	font-weight: 400;
	font-size: 24px;
	line-height: 0px;
`;

const AlertMessage = styled.div`
	width: 215px;
	color: ${({ theme }) => theme.colors['danger']};
	font-family: 'LINESeed';
	font-size: 14px;
	text-align: center;
`;

const PlusButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return <PlusIcon onClick={onClick} style={{ cursor: 'pointer' }} />;
};

const MinusButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return <MinusIcon onClick={onClick} style={{ cursor: 'pointer' }} />;
};

interface RoomParticipantsProps {
	formData: { participants: number };
	onInputChange: (name: 'participants', value: number) => void;
}

const RoomParticipants = ({
	formData,
	onInputChange,
}: RoomParticipantsProps) => {
	const [count, setCount] = useState(formData.participants || 5);
	const [alertMessage, setAlertMessage] = useState('');

	// count가 변경될 때마다 업데이트
	useEffect(() => {
		onInputChange('participants', count);
	}, [count, onInputChange]);

	const handleIncrease = () => {
		if (count < 8) {
			setCount(count + 1);
			setAlertMessage('');
		} else {
			setAlertMessage('최대 또띠 인원은 8명입니다.');
		}
	};

	const handleDecrease = () => {
		if (count > 4) {
			setCount(count - 1);
			setAlertMessage('');
		} else {
			setAlertMessage('최소 또띠 인원은 4명입니다.');
		}
	};

	return (
		<RoomInputContainer>
			<RoomInputColumn>
				<RoomInputTitle>또띠 방 인원</RoomInputTitle>
				<RoomInputExplain>참여할 또띠들은 몇 명인가요?</RoomInputExplain>
			</RoomInputColumn>
			<ContentContainer>
				<MinusButton onClick={handleDecrease} />
				<CountContainer>{count}</CountContainer>
				<PlusButton onClick={handleIncrease} />
			</ContentContainer>
			{alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
		</RoomInputContainer>
	);
};

export default RoomParticipants;
