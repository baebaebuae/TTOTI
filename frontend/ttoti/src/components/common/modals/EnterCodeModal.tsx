import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import {
	Modal,
	ModalTitle,
	ButtonContainer,
} from '@components/common/modals/ModalCard';
import ListBox from '@components/common/box/ListBox';
import { useState } from 'react';
import { getApiClient } from '@services/apiClient';
import { useNavigate } from 'react-router-dom';

const EnterColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-root {
		background-color: ${({ theme }) => theme.colors['background']};
		border: 0px solid transparent;
		border-radius: 8px;
		padding-top: 5px;
		font-family: 'LINESeed';
		font-size: 14px;
		width: 290px;
		height: 45px;
		z-index: 1;

		&:hover fieldset {
			border-color: transparent;
		}
	}
`;

interface CodeInputProps {
	inputCode: string;
	onInputChange: (value: string) => void;
}

const CodeInputBox = ({ inputCode, onInputChange }: CodeInputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		onInputChange(newValue);
	};
	return (
		<StyledTextField
			placeholder="초대 코드를 입력해 주세요."
			value={inputCode}
			onChange={handleChange}
		/>
	);
};
interface EnterContentsProps {
	inputCode: string;
	onInputChange: (value: string) => void;
}
const EnterContents = ({ inputCode, onInputChange }: EnterContentsProps) => {
	return (
		<EnterColumn>
			<ListBox size="small" ListText="초대 코드" />
			<CodeInputBox inputCode={inputCode} onInputChange={onInputChange} />
		</EnterColumn>
	);
};

interface EnterModalProps {
	onClose: () => void;
}

const EnterCodeModal = ({ onClose }: EnterModalProps) => {
	const [inputCode, setInputCode] = useState('');
	const handleInputChange = (value: string) => {
		setInputCode(value);
	};
	const subtitleText = '초대 코드 입력';
	const titleText = '코드를 입력하여 또띠를 시작해보세요!';
	const explainText = '';
	const buttonColor1 = 'success';
	const buttonText1 = '또띠 입장하기';
	const buttonColor2 = 'background';
	const buttonText2 = '닫기';

	const navigate = useNavigate();
	const handleEnter = async () => {
		const apiClient = getApiClient();
		// 초대 코드 테스트 후 연결 예정
		// 기본 구조 세팅 완료
		try {
			const res = await apiClient.get(`/rooms/code/${inputCode}`);
			if (res.status === 200) {
				if (res.data.body) {
					const roomId = res.data.body['roomId'];
					navigate(`game-waiting/${roomId}`);
					console.log('초대코드 입장 성공');
				} else {
					console.log('초대코드 입장 실패');
				}
			} else {
				console.log('코드 입장 api 요청 실패');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Modal>
			<ModalTitle titleText={titleText} subtitleText={subtitleText} />
			<EnterContents inputCode={inputCode} onInputChange={handleInputChange} />
			<ButtonContainer
				explainText={explainText}
				buttonColor1={buttonColor1}
				buttonText1={buttonText1}
				onClick1={handleEnter}
				buttonColor2={buttonColor2}
				buttonText2={buttonText2}
				onClick2={onClose}
			/>
		</Modal>
	);
};

export default EnterCodeModal;
