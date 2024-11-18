import HomeIcon from '@assets/icons/home.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = styled(HomeIcon)`
	cursor: pointer;
`;

const HomeButton = () => {
	const navigate = useNavigate();
	const clickHome = () => {
		navigate('/');
	};
	return <Home onClick={clickHome} />;
};

export default HomeButton;
