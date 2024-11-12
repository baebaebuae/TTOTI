import styled from 'styled-components';
import { Modal, ModalTitle } from '@components/common/modals/ModalCard';
import ttotiInfo from '@utils/description';

import { useState } from 'react';

const CancleText = styled.div`
	font-family: 'LINESeed';
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
	color: black;
`;
const NextText = styled.div`
	font-family: 'LINESeed';
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
	color: ${({ theme }) => theme.colors['info']};
`;

const LeftButton = ({
	onClick,
	currentIndex,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
	currentIndex: number;
}) => {
	return currentIndex === 0 ? (
		<CancleText onClick={onClick}>이전</CancleText>
	) : (
		<CancleText onClick={onClick}>이전</CancleText>
	);
};

const RightButton = ({
	onClick,
	currentIndex,
	onClose,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
	currentIndex: number;
	onClose: React.MouseEventHandler<HTMLDivElement>;
}) => {
	return currentIndex === ttotiInfo.length - 1 ? (
		<NextText onClick={onClose}>닫기</NextText>
	) : (
		<NextText onClick={onClick}>다음</NextText>
	);
};

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 280px;
	justify-content: center;
	align-items: center;
	padding: 0px;
	gap: 50px;
`;

const HeadContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const CreateContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 280px;
`;

const Title = styled.div`
	font-family: 'GmarketSans';
	font-weight: bold;
	font-size: 20px;
	/* margin-bottom: 5px; */
`;

const Subtitle = styled.div`
	font-family: 'GmarketSans';
	font-weight: 400;
	font-size: 16px;
	margin-top: 10px;
	margin-bottom: 15px;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 5px 0px;
	gap: 10px;
`;
const TextContainer = styled.div`
	font-family: 'LINESeed';
	font-weight: 400;
	font-size: 15px;
	margin-top: 5px;
`;
const Divider = styled.div`
	height: 0.5px;
	background-color: #928f8f;
	width: 290px;
`;

const ExplainColumn = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
`;

interface DescriptionContentProps {
	index: number;
}
const DescriptionContent = ({ index }: DescriptionContentProps) => {
	const info = ttotiInfo[index];
	return (
		<ContentWrapper>
			<Title>"{info.title}"</Title>
			<ExplainColumn>
				<Subtitle>😺</Subtitle>
				<Subtitle>{info.subtitle}</Subtitle>
			</ExplainColumn>
			<TextWrapper>
				{info.steps.map((step, stepIndex) => (
					<ExplainColumn>
						<TextContainer key={stepIndex}>🔸</TextContainer>
						<TextContainer key={stepIndex}>{step}</TextContainer>
					</ExplainColumn>
				))}
			</TextWrapper>
		</ContentWrapper>
	);
};

interface DesriptionModal {
	onClose: () => void;
}

const DescriptionModal = ({ onClose }: DesriptionModal) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === ttotiInfo.length - 1 ? ttotiInfo.length - 1 : prevIndex + 1,
		);
	};
	return (
		<Modal>
			<HeadContainer>
				<ModalTitle
					titleText="또띠 서비스에 오신걸 환영합니다!"
					subtitleText="또띠 서비스 설명"
				/>
				<Divider />
			</HeadContainer>
			<CreateContainer>
				<DescriptionContent index={currentIndex} />
			</CreateContainer>

			<ButtonWrapper>
				<LeftButton onClick={handlePrevious} currentIndex={currentIndex} />

				<RightButton
					onClick={handleNext}
					currentIndex={currentIndex}
					onClose={onClose}
				/>
			</ButtonWrapper>
		</Modal>
	);
};

export default DescriptionModal;
