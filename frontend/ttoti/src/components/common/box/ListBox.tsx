import styled from 'styled-components';

interface ListBoxProps {
	size?: 'large' | 'small';
	ListText: string;
}

const ListBoxContainer = styled.div<Pick<ListBoxProps, 'size'>>`
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
	width: ${({ size }) => (size === 'large' ? '116px' : '85px')};
	height: ${({ size }) => (size === 'large' ? '35px' : '26px')};
`;

const ListTitle = styled.div<Pick<ListBoxProps, 'size'>>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 5px;
	margin: 0;
	font-family: 'GmarketSans';
	font-weight: 500;
	font-size: ${({ size }) => (size === 'large' ? '16px' : '14px')};
	color: white;
`;

const ListBox = ({ size, ListText }: ListBoxProps) => {
	return (
		<ListBoxContainer size={size}>
			<ListTitle size={size}>{ListText}</ListTitle>
		</ListBoxContainer>
	);
};

export default ListBox;
