import styled from 'styled-components';
import {
	Modal,
	ModalTitle,
	ButtonContainer,
} from '@components/common/modals/ModalCard';
import ListBox from '@components/common/box/ListBox';

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px;
	gap: 10px;
`;
const ListRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
`;
const ListColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
const ListText = styled.div`
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
	line-height: 150%;
	padding-top: 3px;
	margin-left: 5px;
`;

const ListContent = () => {
	// key - value 로 진행할 예정
	// map으로 구현 예정
	return (
		<ListContainer>
			<ListRow>
				<ListBox size="small" ListText="방 제목" />
				<ListText>99NULL</ListText>
			</ListRow>
			<ListRow>
				<ListBox size="small" ListText="방장" />
				<ListText>정진영</ListText>
			</ListRow>
			<ListRow>
				<ListBox size="small" ListText="또띠 인원" />
				<ListText>8명</ListText>
			</ListRow>
			<ListColumn>
				<ListBox size="small" ListText="참여자" />
				<ListText>권재현, 김호진, 서지민, 채이슬, 이상무, 정진영</ListText>
			</ListColumn>
			<ListRow>
				<ListBox size="small" ListText="종료 시간" />
				<ListText>18:30</ListText>
			</ListRow>
			<ListColumn>
				<ListBox size="small" ListText="진행 기간" />
				<ListText>2024/10/24 ~ 2024/10/30</ListText>
			</ListColumn>
		</ListContainer>
	);
};

const InfoModal = () => {
	const subtitleText = '또띠 정보';
	const titleText = '또띠 방 정보를 확인해보세요!';
	const explainText = '마이 페이지로 이동하여 또띠 결과를 확인해보세요!';
	const buttonColor1 = 'danger';
	const buttonText1 = '나가기';
	const buttonColor2 = 'background';
	const buttonText2 = '닫기';

	// const navigate = useNavigate();

	const handleMypage = () => {
		// 나가기 버튼을 활성화해주세욘
		console.log('/game');
	};
	const handleClose = () => {
		console.log('close 버튼을 활성화 함수를 연결해주세요');
	};

	return (
		<Modal>
			<ModalTitle titleText={titleText} subtitleText={subtitleText} />
			<ListContent />
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

export default InfoModal;
