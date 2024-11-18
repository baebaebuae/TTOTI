import styled from 'styled-components';
import {
	Modal,
	ModalTitle,
	ButtonContainer,
} from '@components/common/modals/ModalCard';
import Check from '@assets/icons/check.svg?react';

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 10px;
`;
const ContentRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 7px;
	font-size: 12px;
	font-weight: 300;
`;

const TextRow = styled.div`
	font-family: 'LINESeed';
	font-size: 12px;
	font-weight: normal;
	margin: 0;
`;
const ModalContent = () => {
	return (
		<ContentWrapper>
			<ContentRow>
				<Check />
				<TextRow>나의 마니또와 마니띠를 확인할 수 있습니다.</TextRow>
			</ContentRow>
			<ContentRow>
				<Check />
				<TextRow>내가 푼 또띠 퀴즈들을 볼 수 있습니다.</TextRow>
			</ContentRow>
			<ContentRow>
				<Check />
				<TextRow>또띠 크레딧을 통해 추억을 회상해보세요!</TextRow>
			</ContentRow>
		</ContentWrapper>
	);
};

export const MainModal = () => {
	const TopContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0px;
		gap: 10px;
	`;

	const subtitleText = '알림';
	const titleText = '진행 중인 또띠 게임이 끝났습니다!';
	const explainText = '마이 페이지로 이동하여 또띠 결과를 확인해보세요!';
	const buttonColor1 = 'info';
	const buttonText1 = '마이페이지로 이동하기';
	const buttonColor2 = 'background';
	const buttonText2 = '닫기';

	const handleMypage = () => {
		console.log('/mypage');
	};

	const handleClose = () => {
		console.log('모달 close를 연결해 주세요.');
	};
	return (
		<Modal>
			<TopContainer>
				<ModalTitle titleText={titleText} subtitleText={subtitleText} />
				<ModalContent />
			</TopContainer>
			<ButtonContainer
				explainText={explainText}
				buttonColor1={buttonColor1}
				buttonText1={buttonText1}
				onClick1={handleMypage}
				buttonColor2={buttonColor2}
				buttonText2={buttonText2}
				onClick2={handleClose}
			/>
		</Modal>
	);
};
