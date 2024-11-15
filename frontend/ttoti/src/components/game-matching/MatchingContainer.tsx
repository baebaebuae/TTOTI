import styled from 'styled-components';

const Header = styled.div`
	font-family: 'LINESeed';
	font-weight: bold;
	font-size: 24px;
	text-align: center;
	color: black;
	text-shadow:
		-1px -1px 0 white,
		1px -1px 0 white,
		-1px 1px 0 white,
		1px 1px 0 white;
`;

const Explain = styled.div`
	font-family: 'LINESeed';
	font-weight: normal;
	color: white;
	font-size: 16px;
	text-align: center;
`;

const TopColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
`;

interface TopContainerProps {
	header: string;
	explain: string;
}

export const TopContainer = ({ header, explain }: TopContainerProps) => {
	return (
		<TopColumn>
			<Header>{header}</Header>
			<Explain>{explain}</Explain>
		</TopColumn>
	);
};
