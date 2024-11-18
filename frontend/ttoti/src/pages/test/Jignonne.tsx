import styled from 'styled-components';

const TestWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	background-color: ${({ theme }) => theme.colors['main']};
	height: 100%;
`;

const Jignonne = () => {
	return (
		<TestWrapper>
			<h1>테스트 끝!</h1>
		</TestWrapper>
	);
};

export default Jignonne;
