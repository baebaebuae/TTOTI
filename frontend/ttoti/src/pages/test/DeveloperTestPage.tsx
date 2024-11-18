import styled from 'styled-components';

const TestWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	background-color: ${({ theme }) => theme.colors['main']};
	height: 100%;
`;

const DeveloperTest = () => {
	return (
		<TestWrapper>
			<h1>권재현 바보 </h1>
			<h2>ㅋㅋㅋㅋ 반박불가쥬?</h2>
			<h3>응~~ 바보에요^^</h3>
		</TestWrapper>
	);
};

export default DeveloperTest;
