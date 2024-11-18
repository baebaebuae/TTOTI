import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	RoomInputContainer,
	RoomInputColumn,
	RoomInputExplain,
	RoomInputTitle,
} from '@components/room-create/action/RoomInputCard';
import TimeAccountIcon from '@assets/icons/time_account.svg?react';

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px;
	margin-top: 10px;
	gap: 25px;
	width: 215px;
	font-family: 'LINESeed';
	font-size: 20px;
	font-weight: bold;
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px;
	gap: 10px;
	width: 40px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px 10px 5px 10px;
	width: 40px;
	height: 25px;
	background-color: white;
	border: 1px solid black;
	border-radius: 6px;

	font-family: 'LINESeed';
	font-size: 20px;
`;

const AlertMessage = styled.div`
	width: 215px;
	color: ${({ theme }) => theme.colors['info']};
	font-family: 'LINESeed';
	font-size: 14px;
	text-align: center;
`;

// 시간 조작 버튼 생성
const ReversedIcon = styled(TimeAccountIcon)`
	transform: rotate(180deg);
`;

const PlusButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return <TimeAccountIcon onClick={onClick} style={{ cursor: 'pointer' }} />;
};

const MinusButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return <ReversedIcon onClick={onClick} style={{ cursor: 'pointer' }} />;
};

interface RoomTimeProps {
	formData: { finishTime: string };
	onInputChange: (name: 'finishTime', value: string) => void;
}
const RoomTime = ({ formData, onInputChange }: RoomTimeProps) => {
	const initialHour = formData.finishTime
		? parseInt(formData.finishTime.split(':')[0])
		: 18;
	const initialMinute = formData.finishTime
		? parseInt(formData.finishTime.split(':')[1])
		: 30;

	const [hour, setHour] = useState(initialHour);
	const [minute, setMinute] = useState(initialMinute);

	// 데이터 형식 'hh:mm:ss' 로 맞추기 위한 선언
	const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
	useEffect(() => {
		onInputChange('finishTime', formattedTime);
	}, [hour, minute, onInputChange, formattedTime]);

	const incrementHour = () => setHour((prev) => (prev + 1) % 24);
	const decrementHour = () => setHour((prev) => (prev === 0 ? 23 : prev - 1));

	const incrementMinute = () => setMinute((prev) => (prev + 30) % 60);
	const decrementMinute = () =>
		setMinute((prev) => (prev === 0 ? 30 : prev - 30));

	return (
		<RoomInputContainer>
			<RoomInputColumn>
				<RoomInputTitle>또띠 종료 시간</RoomInputTitle>
				<RoomInputExplain>또띠 결과를 몇 시에 공개할까요?</RoomInputExplain>
			</RoomInputColumn>
			<RowContainer>
				<ColumnContainer>
					<PlusButton onClick={incrementHour} />
					<Container>{String(hour).padStart(2, '0')}</Container>
					<MinusButton onClick={decrementHour} />
				</ColumnContainer>
				:
				<ColumnContainer>
					<PlusButton onClick={incrementMinute} />
					<Container>{String(minute).padStart(2, '0')}</Container>
					<MinusButton onClick={decrementMinute} />
				</ColumnContainer>
			</RowContainer>
			<AlertMessage>30분 단위로 조정이 가능합니다.</AlertMessage>
		</RoomInputContainer>
	);
};

export default RoomTime;
