import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Content from '@components/room-create/Content';
import { createComponents } from './CreateContent';
import { FormData } from 'src/types/InputForm';

import CloseIcon from '@assets/icons/close.svg?react';
import ToggleIcon from '@assets/icons/toggle.svg?react';
import ToggleActiveIcon from '@assets/icons/toggle_active.svg?react';
import { useNavigate } from 'react-router-dom';

const CreateCardBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 270px;
	padding: 29px 20px;
	background-color: ${({ theme }) => theme.colors['modal']};
	border-radius: 12px;
`;

const CloseDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 260px;
	margin-bottom: 10px;
`;

const Close = styled(CloseIcon)`
	cursor: pointer;
`;

const CreateContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 280px;
`;

const Active = styled(ToggleActiveIcon)`
	cursor: pointer;
`;

const RotatedInactive = styled(ToggleIcon)`
	transform: rotate(180deg);
`;
const RotatedActive = styled(ToggleActiveIcon)`
	transform: rotate(180deg);
	cursor: pointer;
`;

const ErrorMessage = styled.div`
	font-family: 'LINESeed';
	font-size: 14px;
	color: ${({ theme }) => theme.colors['danger']};
`;

const LeftButton = ({
	onClick,
	currentIndex,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
	currentIndex: number;
}) => {
	return currentIndex === 0 ? (
		<RotatedInactive />
	) : (
		<RotatedActive onClick={onClick} />
	);
};

const RightButton = ({
	onClick,
	currentIndex,
}: {
	onClick: React.MouseEventHandler<SVGSVGElement>;
	currentIndex: number;
}) => {
	return currentIndex === createComponents.length - 1 ? (
		<ToggleIcon />
	) : (
		<Active onClick={onClick} />
	);
};

const CreateCard = () => {
	// 카드 컴포넌트 인덱스 초기화
	const [currentIndex, setCurrentIndex] = useState(0);

	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleCloseClick = () => {
		navigate('/');
	};

	// 입력 데이터 초기화

	const [formData, setFormData] = useState<FormData>({
		name: '',
		participants: 5,
		period: 7,
		finishTime: '18:30:00',
	});

	const handleInputChange = useCallback(
		(name: keyof FormData, value: string | number) => {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		},
		[],
	);

	// 경고 알림창 업데이트

	useEffect(() => {
		if (formData.name) {
			setError(' ');
		}
	}, [formData.name]);

	// 페이지 이동 이동 함수 작성
	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
	};

	const handleNext = () => {
		if (currentIndex === 0 && formData.name === '') {
			setError('방 이름을 입력해주세요.');
			return;
		}

		setError('');
		setCurrentIndex((prevIndex) =>
			prevIndex === createComponents.length - 1
				? createComponents.length - 1
				: prevIndex + 1,
		);
	};

	return (
		<CreateCardBox>
			<CloseDiv>
				<Close onClick={handleCloseClick} />
			</CloseDiv>
			<CreateContainer>
				<LeftButton onClick={handlePrevious} currentIndex={currentIndex} />
				<Content
					index={currentIndex}
					formData={formData}
					onInputChange={handleInputChange}
				/>
				<RightButton onClick={handleNext} currentIndex={currentIndex} />
			</CreateContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</CreateCardBox>
	);
};

export default CreateCard;
