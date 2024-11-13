import styled from 'styled-components';
import {
	RoomInputContainer,
	RoomInputColumn,
	RoomInputExplain,
	RoomInputTitle,
} from '@components/room-create/action/RoomInputCard';
import { Slider, SliderProps } from '@mui/material';
import { useEffect, useState } from 'react';

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px;
	gap: 10px;
	margin: 0 auto;
`;

const CountContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 45px;
	padding-top: 5px;
	gap: 10px;
	background-color: ${({ theme }) => theme.colors['background']};
	border-radius: 100%;
	font-family: 'LINESeed';
	font-weight: 400;
	font-size: 24px;
	line-height: 0px;
`;
const PeriodText = styled.div`
	font-family: 'LINESeed';
	font-family: 16px;
	font-weight: 400;
`;
const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	gap: 14px;
	width: 215px;
`;

// Mui Slider 사용
const CustomedSlider = styled(Slider)`
	height: 20px;

	& .MuiSlider-track {
		height: 14px;
		background-color: ${({ theme }) => theme.colors['info']};
		border: transparent;
		box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
	}
	.MuiSlider-thumb {
		height: 26px;
		width: 26px;
		background-color: ${({ theme }) => theme.colors['info']};
		border: 3px solid white;
		&:hover,
		&.Mui-focusVisible,
		&.Mui-active {
			box-shadow: none;
		}
	}

	.MuiSlider-rail {
		box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
		border-radius: 50px;
		height: 14px;
		color: ${({ theme }) => theme.colors['background']};
		opacity: 1;
		border-radius: 10px;
	}

	.MuiSlider-mark {
		display: none;
	}
	.MuiSlider-markLabel {
		margin-top: 5px;
		font-family: 'LINESeed';
		font-size: 14px;
		font-weight: 400;
		color: black;

		&.MuiSlider-markLabelActive {
			color: black;
		}
	}
`;

interface RoomPeriodProps {
	formData: { period: number };
	onInputChange: (name: 'period', value: number) => void;
}

const PeriodSlider = ({
	value,
	onChange,
}: {
	value: number;
	onChange: SliderProps['onChange'];
}) => {
	const marks = [
		{ value: 1, label: '1일' },
		{ value: 7, label: '7일' },
		{ value: 14, label: '14일' },
	];
	return (
		<CustomedSlider
			value={value}
			onChange={onChange}
			min={1}
			max={14}
			marks={marks}
			step={1}
			onMouseDown={(e) => e.currentTarget.blur()}
		/>
	);
};

const RoomPeriod = ({ formData, onInputChange }: RoomPeriodProps) => {
	const [period, setPeriod] = useState(formData.period || 7);

	// period가 변경될 때마다 업데이트
	useEffect(() => {
		onInputChange('period', period);
	}, [period, onInputChange]);

	const handleChange: SliderProps['onChange'] = (_, newValue) => {
		// Mui 제공 SliderProps의 newValue 타입이 number || Array 이기 때문에 단언 선언
		setPeriod(newValue as number);
	};

	return (
		<RoomInputContainer>
			<RoomInputColumn>
				<RoomInputTitle>또띠 기간</RoomInputTitle>
				<RoomInputExplain>진행할 또띠 기간을 입력해 주세요.</RoomInputExplain>
			</RoomInputColumn>
			<ColumnContainer>
				<RowContainer>
					<CountContainer>{period}</CountContainer>
					<PeriodText>일 동안</PeriodText>
				</RowContainer>
				<PeriodSlider value={period} onChange={handleChange} />
			</ColumnContainer>
		</RoomInputContainer>
	);
};

export default RoomPeriod;
