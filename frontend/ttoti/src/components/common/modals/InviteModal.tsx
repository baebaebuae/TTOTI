import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Modal, ModalTitle } from '@components/common/modals/ModalCard';
import DefaultButtons from '@components/common/buttons/DefaultButtons';
import ListBox from '@components/common/box/ListBox';
import DuplicateIcon from '@assets/icons/duplicate.svg?react';

interface inviteProps {
	onClose: () => void;
	roomCode: string;
}

const InviteModal: React.FC<inviteProps> = ({ onClose, roomCode }) => {
	const subtitleText = '또띠 초대';
	const titleText = '친구를 또띠에 초대해주세요!';
	const buttonColor2 = 'background';
	const buttonText2 = '닫기';

	return (
		<ModalOverlay onClick={onClose}>
			<Modal onClick={(e) => e.stopPropagation()}>
				<ModalTitle titleText={titleText} subtitleText={subtitleText} />
				<InviteContents roomCode={roomCode} />
				<DefaultButtons
					color={buttonColor2}
					onClick={onClose}
					style={{ alignSelf: 'center' }}
				>
					{buttonText2}
				</DefaultButtons>
			</Modal>
		</ModalOverlay>
	);
};

export default InviteModal;

const InviteContents: React.FC<{ roomCode: string }> = ({ roomCode }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000); // 2초 후 복사 상태 해제
			})
			.catch((error) => {
				console.error('복사 실패:', error);
			});
	};

	return (
		<>
			<InviteWrapper>
				<InviteColumn>
					<ListBox size="small" ListText="초대 코드" />
					<InviteBox>
						<InviteText>{roomCode}</InviteText>
						<DuplicateIcon
							onClick={() => copyToClipboard(roomCode)}
							style={{ cursor: 'pointer', width: '25px' }}
						/>
					</InviteBox>
				</InviteColumn>
			</InviteWrapper>
			{copied && (
				<CopyMessage
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.3 }}
					style={{ marginLeft: 80 }}
				>
					복사되었습니다.
				</CopyMessage>
			)}
		</>
	);
};

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
	padding-top: 3px;
	width: 243px;
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: 300;
`;

const CopyMessage = styled(motion.div)`
	position: absolute;
	bottom: 20px; /* 화면 하단에서 20px 위 */
	transform: translateX(-50%); /* 박스 중심을 화면 중앙에 맞춤 */
	padding: 10px 20px; /* 메시지 박스 내부 여백 */
	background-color: #67c431; /* 메시지 배경색 */
	color: #fff; /* 텍스트 색상 */
	font-family: Arial, sans-serif; /* 기본 폰트 설정 */
	font-size: 14px; /* 텍스트 크기 */
	font-weight: bold; /* 텍스트 굵기 */
	border-radius: 10px; /* 둥근 모서리 */
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
	text-align: center; /* 텍스트 중앙 정렬 */
	z-index: 1100; /* 상위 레이어 설정 */
	max-width: 90%; /* 최대 너비 (화면의 90%) */
	word-break: break-word; /* 긴 텍스트 줄바꿈 */
`;
