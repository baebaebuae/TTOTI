import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import {
	RoomInputContainer,
	RoomInputColumn,
	RoomInputExplain,
	RoomInputTitle,
} from '@components/room-create/action/RoomInputCard';
import { useState } from 'react';

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-root {
		background-color: white;
		/* border: 1px solid black; */
		border-radius: 8px;
		padding-top: 5px;
		font-family: 'LINESeed';
		font-size: 14px;
		width: 215px;
		height: 45px;

		&.Mui-focused {
			background-color: rgba(27, 149, 236, 0.1);
			box-shadow: 0 0 2px 2px rgba(27, 149, 236, 0.4); /* 클릭 시 박스 주변에 그림자 */
			/* border: 3px solid ${({ theme }) => theme.colors['main']}; */
		}

		&:hover fieldset {
			border: 3px solid ${({ theme }) => theme.colors['main']};
		}
	}
	.MuiOutlinedInput-notchedOutline {
		border: 1px solid black;
	}
`;

interface RoomNameProps {
	formData: { name: string };
	onInputChange: (name: 'name', value: string) => void;
}

const NameInputBox = ({ formData, onInputChange }: RoomNameProps) => {
	const [placeholder, setPlaceholder] =
		useState('최대 8글자까지 입력 가능합니다.');
	const handleFocus = () => setPlaceholder('');
	const handleBlur = () => setPlaceholder('최대 8글자까지 입력 가능합니다.');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		// 8글자 이하일 때만 상태 업데이트
		if (newValue.length <= 8) {
			onInputChange('name', newValue);
		}
	};
	return (
		<StyledTextField
			slotProps={{
				formHelperText: {
					sx: { textAlign: 'right', fontFamily: 'LINESeed', marginTop: '5px' },
				}, // 글자 수 표시 위치 커스텀
			}}
			placeholder={placeholder}
			value={formData.name}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onChange={handleChange}
			helperText={`${formData.name.length}/8`} // 글자 수 표시
		/>
	);
};

const RoomName = ({ formData, onInputChange }: RoomNameProps) => {
	return (
		<RoomInputContainer>
			<RoomInputColumn>
				<RoomInputTitle>또띠 방 이름</RoomInputTitle>
				<RoomInputExplain>
					진행할 또띠 방의 이름을 작성해 주세요.
				</RoomInputExplain>
			</RoomInputColumn>
			<NameInputBox formData={formData} onInputChange={onInputChange} />
		</RoomInputContainer>
	);
};

export default RoomName;
