import styled from 'styled-components';
import { ContentProps } from 'src/types/InputForm';

import { createComponents } from './CreateContent';

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 33px;
	padding: 0px;
	width: 215px;
	min-height: 180px;
`;
const HeadText = styled.div`
	width: 215px;
	font-family: 'GmarketSans';
	font-weight: bold;
	font-size: 24px;
`;

const Content = ({ index, formData, onInputChange }: ContentProps) => {
	const CreateComponent = createComponents[index];
	return (
		<ContentWrapper>
			<HeadText>방 만들기</HeadText>
			<CreateComponent formData={formData} onInputChange={onInputChange} />
		</ContentWrapper>
	);
};

export default Content;
