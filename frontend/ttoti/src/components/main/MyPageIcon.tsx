import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Sheep from '@assets/characters/sheep_portrait.png';
import RedPanda from '@assets/characters/redPanda_portrait.png';
import MenuIcon from '@assets/icons/menu_icon.png'; // 메뉴 아이콘 경로

interface MyPageIconProps {
	handleModal: () => void;
}

const MenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative; // Ensure Menu is positioned relative to this container
	cursor: pointer;
`;

const MenuButton = styled.div`
	width: 32px;
	height: 32px;
	background-image: url(${MenuIcon});
	background-size: cover;
`;

const Menu = styled.div`
	width: 80px;
	position: absolute; // Position Menu absolutely relative to MenuWrapper
	top: 30px; // Adjust the space between the button and menu
	left: 25px;
	padding: 5px;
	transform: translateX(-50%); // Center the menu horizontally
	z-index: 10; // Ensure the menu appears above the button
`;

const MenuItem = styled.div<{ $backgroundImage: string }>`
	width: 50px; /* 원형의 크기 설정 */
	height: 50px; /* 원형의 크기 설정 */
	border-radius: 50%; /* 원형으로 만들기 위해 border-radius를 50%로 설정 */
	text-align: center;
	font-family: 'LINESeed';
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding: 6px;
	border: 1px solid black;
	margin-top: 6px;
	cursor: pointer;
	background-image: url(${(props) => props.$backgroundImage});
	background-size: cover; /* 이미지가 원형 영역을 덮도록 설정 */
	background-position: center; /* 이미지가 중앙에 위치하도록 설정 */
	color: black; /* 글씨 색상 */
	font-size: 12px; /* 글씨 크기 조정 */
	&:hover {
		background-color: rgba(240, 240, 240, 0.8);
	}
`;

const MyPageIcon: React.FC<MyPageIconProps> = ({ handleModal }) => {
	const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태
	const navigate = useNavigate();

	const toggleMenu = () => {
		setMenuOpen((prevState) => !prevState); // 메뉴 열기/닫기
	};

	const handleMenuItemClick = (path: string) => {
		navigate(path); // 선택한 경로로 이동
		setMenuOpen(false); // 메뉴 닫기
	};

	return (
		<MenuWrapper>
			<MenuButton onClick={toggleMenu} />
			{menuOpen && (
				<Menu>
					<MenuItem
						$backgroundImage={RedPanda} // Sheep 이미지를 배경으로 사용
						onClick={() => {
							handleMenuItemClick('/mypage');
							setMenuOpen(false);
						}}
						style={{ backgroundColor: '#ff6430' }}
					>
						MY
					</MenuItem>
					<MenuItem
						$backgroundImage={Sheep} // RedPanda 이미지를 배경으로 사용
						onClick={() => {
							handleModal();
							setMenuOpen(false);
						}}
						style={{ backgroundColor: '#ffcd05' }}
					>
						설명
					</MenuItem>
				</Menu>
			)}
		</MenuWrapper>
	);
};

export default MyPageIcon;
