import styled from 'styled-components';
import { ColorProps } from 'src/types/ColorsTheme';

const GameButtons = styled.button<ColorProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 3px;
	width: 120px;
	height: 35px;
	border: 0px solid transparent;
	border-radius: 15px;
	font-family: 'GmarketSans';
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	background-color: ${({ theme, color }) => theme.colors[color]};
	color: white;
	line-height: 0px;
`;

export default GameButtons;
