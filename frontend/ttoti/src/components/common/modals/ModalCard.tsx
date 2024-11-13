import styled from 'styled-components';
import { ModalTitleProps, ModalButtonProps } from 'src/types/ModalText';
import DefaultButtons from '@components/common/buttons/DefaultButtons';
import Kakao from '@assets/icons/kakao.svg?react';

// 모달 카드
export const Modal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 25px;
	padding: 30px 25px;
	width: 340px;
	box-sizing: border-box;
	border-radius: 28px;
	border: 0px solid transparent;
	background-color: ${({ theme }) => theme.colors['modal']};
`;

const ModalTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 5px;
	font-family: 'LINESeed';
`;

const Subtitle = styled.div`
	font-size: 14px;
	margin: 0;
`;
const Title = styled.div`
	font-size: 16px;
	margin: 0;
	font-weight: bold;
`;

// 모달 제목 컨테이너
export const ModalTitle = ({ subtitleText, titleText }: ModalTitleProps) => {
	return (
		<ModalTitleContainer>
			<Subtitle>{subtitleText}</Subtitle>
			<Title>{titleText}</Title>
		</ModalTitleContainer>
	);
};

// 모달 버튼 컨테이너
const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px;
	gap: 12px;
	width: 290px;
`;
const ExplainText = styled.div`
	font-family: 'LINESeed';
	font-size: 12px;
	font-weight: normal;
	text-align: center;
	margin: 0;
`;
export const ButtonContainer = ({
	explainText,
	buttonColor1,
	buttonText1,
	onClick1,
	buttonColor2,
	buttonText2,
	onClick2,
}: ModalButtonProps) => {
	return (
		<ButtonWrapper>
			<ExplainText>{explainText}</ExplainText>
			<DefaultButtons color={buttonColor1} onClick={onClick1} style={{"display": "none"}}>
				{buttonColor1 === 'login' && <Kakao />}
				{buttonText1}
			</DefaultButtons>
			<DefaultButtons color={buttonColor2} onClick={onClick2}>
				{buttonText2}
			</DefaultButtons>
		</ButtonWrapper>
	);
};
