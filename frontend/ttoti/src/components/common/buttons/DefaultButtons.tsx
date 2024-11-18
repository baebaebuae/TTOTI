import styled from 'styled-components';
import { ColorProps } from 'src/types/ColorsTheme';

const DefaultButtons = styled.button<ColorProps>`
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px 14px;
	width: 210px;
	height: 45px;
	gap: 10px;
	box-sizing: border-box;
	border: 0px solid transparent;
	border-radius: 6px;
	font-family: 'LINESeed';
	font-size: 16px;
	text-align: center;
	cursor: pointer;
	background-color: ${({ theme, color }) => theme.colors[color]};
	color: ${({ color }) =>
		color === 'background' || color === 'login' ? 'black' : 'white'};
`;

export default DefaultButtons;
