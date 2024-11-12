import styled from 'styled-components';

interface ListBoldBoxProps {
	size?: 'large' | 'small';
	ListText: string;
}

const ListBoldBoxContainer = styled.div<Pick<ListBoldBoxProps, 'size'>>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 5px 12px;
	border: 0px solid transparent;
	box-sizing: border-box;
	border-radius: 15px;
	background-color: ${({ theme }) => theme.colors['info']};
	gap: 10px;
	width: 90px;
	height: ${({ size }) => (size === 'large' ? '35px' : '26px')};
`;

const ListTitle = styled.div<Pick<ListBoldBoxProps, 'size'>>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 5px;
	margin: 0;
	font-family: 'GmarketSans';
	font-weight: bold;
	font-size: 16px;
	color: white;
`;

const ListBoldBox = ({ size, ListText }: ListBoldBoxProps) => {
	return (
		<ListBoldBoxContainer size={size}>
			<ListTitle size={size}>{ListText}</ListTitle>
		</ListBoldBoxContainer>
	);
};

export default ListBoldBox;
