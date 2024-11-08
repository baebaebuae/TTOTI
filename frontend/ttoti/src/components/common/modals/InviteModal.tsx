// InviteModal.tsx
import styled from 'styled-components';
import {
	Modal,
	ModalTitle,
	ButtonContainer,
} from '@components/common/modals/ModalCard';
import ListBox from '@components/common/box/ListBox';
import DuplicateIcon from '@assets/icons/duplicate.svg?react';

interface inviteProps {
	onClose: () => void;
	roomCode: string;
}
const InviteModal: React.FC<inviteProps> = ({ onClose, roomCode }) => {
	const subtitleText = '또띠 초대';
	const titleText = '친구를 또띠에 초대해주세요!';
	const explainText = '';
	const buttonColor1 = 'login';
	const buttonText1 = '카카오톡 공유하기';
	const buttonColor2 = 'background';
	const buttonText2 = '닫기';

	const handleInvite = () => {
		console.log('/game');
	};

	return (
		<ModalOverlay onClick={onClose}>
			<Modal>
				<ModalTitle titleText={titleText} subtitleText={subtitleText} />
				<InviteContents roomCode={roomCode} />
				<ButtonContainer
					explainText={explainText}
					buttonColor1={buttonColor1}
					buttonText1={buttonText1}
					onClick1={handleInvite}
					buttonColor2={buttonColor2}
					buttonText2={buttonText2}
					onClick2={onClose}
				/>
			</Modal>
		</ModalOverlay>
	);
};

export default InviteModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const InviteWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
`;

const InviteColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const InviteBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px 10px;
	height: 35px;
	border: 1px solid black;
	border-radius: 6px;
`;

const InviteText = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-top: 3px;
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: 300;
`;

const InviteContents: React.FC<{ roomCode: string }> = ({ roomCode }) => {
	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('초대 코드 복사 완료');
			})
			.catch((error) => {
				console.error('복사 실패:', error);
			});
	};
	return (
		<InviteWrapper>
			<InviteColumn>
				<ListBox size="small" ListText="초대 링크" />
				<InviteBox>
					<InviteText>https://ttoti.invte</InviteText>
					<DuplicateIcon />
				</InviteBox>
			</InviteColumn>
			<InviteColumn>
				<ListBox size="small" ListText="초대 코드" />
				<InviteBox>
					<InviteText>{roomCode}</InviteText>
					<DuplicateIcon onClick={() => copyToClipboard(roomCode)} />
				</InviteBox>
			</InviteColumn>
		</InviteWrapper>
	);
};
