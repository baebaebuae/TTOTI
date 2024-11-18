import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import framer-motion
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
	position: relative;
	cursor: pointer;
`;

const MenuButton = styled.div`
	width: 32px;
	height: 32px;
	background-image: url(${MenuIcon});
	background-size: cover;
`;

const Menu = styled(motion.div)` // Use motion.div for animation
	width: 80px;
	position: absolute;
	top: 30px;
	left: -18px;
	padding: 5px;
	transform: translateX(-50%);
	z-index: 10;
`;

const MenuItem = styled(motion.div)<{ $backgroundImage: string }>` // motion.div for each item
	width: 50px;
	height: 50px;
	border-radius: 50%;
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
	background-size: cover;
	background-position: center;
	color: black;
	font-size: 12px;
	&:hover {
		background-color: rgba(240, 240, 240, 0.8);
	}
`;

const slideVariants = {
	hidden: { opacity: 0, y: -20 }, // Initially hidden
	visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Slide down
	exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }, // Slide up when exiting
};

const MyPageIcon: React.FC<MyPageIconProps> = ({ handleModal }) => {
	const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태
	const navigate = useNavigate();

	const toggleMenu = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const handleMenuItemClick = (path: string) => {
		navigate(path);
		setMenuOpen(false);
	};

	return (
		<MenuWrapper>
			<MenuButton onClick={toggleMenu} />
			{menuOpen && (
				<Menu
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={slideVariants}
				>
					<MenuItem
						$backgroundImage={RedPanda}
						onClick={() => {
							handleMenuItemClick('/mypage');
							setMenuOpen(false);
						}}
						style={{ backgroundColor: '#ff6430' }}
						variants={slideVariants}
					>
						MY
					</MenuItem>
					<MenuItem
						$backgroundImage={Sheep}
						onClick={() => {
							handleModal();
							setMenuOpen(false);
						}}
						style={{ backgroundColor: '#ffcd05' }}
						variants={slideVariants}
					>
						설명
					</MenuItem>
				</Menu>
			)}
		</MenuWrapper>
	);
};

export default MyPageIcon;
