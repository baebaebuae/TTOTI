import React, { useRef, useState } from "react";
import styled from "styled-components";
import RabbitGif from '@assets/gamecloud/RabbitGif.gif';
import ProfileContainer from '@components/common/ProfileComponents';

import profile1 from '@assets/profiles/profile1.png';
import profile2 from '@assets/profiles/profile2.png';
import profile3 from '@assets/profiles/profile3.png';
import profile4 from '@assets/profiles/profile4.png';
import profile5 from '@assets/profiles/profile5.png';
import profile6 from '@assets/profiles/profile6.png';
import profile7 from '@assets/profiles/profile7.png';
import profile8 from '@assets/profiles/profile8.png';

interface GuessModalModalProps {
  onClose: () => void;
}

const GuessModal: React.FC<GuessModalModalProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [$selectedNumber, set$SelectedNumber] = useState<number>(-1)
  // const [isOverflow, setIsOverflow] = useState(false);
  const isOverflow = true;
  const participants = [
    { name: '정진영', imgSrc: profile1 },
    { name: '서지민', imgSrc: profile2 },
    { name: '김호진', imgSrc: profile3 },
    { name: '권재현', imgSrc: profile4 },
    { name: '채이슬', imgSrc: profile5 },
    { name: '이상무', imgSrc: profile6 },
    { name: '아쿠아', imgSrc: profile7 },
    { name: '토오사카', imgSrc: profile8 },
  ]
  let isDragging = false;
	let startX: number;
	let scrollLeft: number;

  const handleSelect = (key: number) => {
    set$SelectedNumber(key)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		startX = e.pageX - (containerRef.current?.offsetLeft || 0);
		scrollLeft = containerRef.current?.scrollLeft || 0;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - (containerRef.current?.offsetLeft || 0);
		const walk = (x - startX) * 1.5; // 스크롤 속도 조정
		if (containerRef.current)
			containerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUpOrLeave = () => {
		isDragging = false;
	};

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
					<Title>나의 마니또는 누구?</Title>
					<Description>예상되는 마니또를 추측해보세요!</Description>
				</Header>
        <Body>
          <ManittoBox>
            <ImageWrapper>
              <ProfileImage src={RabbitGif} alt="RabbitGif" />
            </ImageWrapper>
            <TextWrapper>
              <SubText>나의 마니또</SubText>
              <ProfileText>까칠한 토끼</ProfileText>
            </TextWrapper>
          </ManittoBox>
          <ParticipantsContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            $isOverflow={isOverflow}
          >
            <ParticipantBlank />
            {participants.map((participant, index) => (
              <Participant key={index} onClick={() => {handleSelect(index)}} >
                <ProfileContainer 
                  size="70px" 
                  src={participant.imgSrc} 
                  ready={index === $selectedNumber} 
                />
                <ParticipantName>{participant.name}</ParticipantName>
              </Participant>
            ))}
            <ParticipantBlank />
          </ParticipantsContainer>
        </Body>
        <Footer>
          <ButtonBox onClick={onClose} $selectedNumber={$selectedNumber}>완료</ButtonBox>
        </Footer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GuessModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
	display: flex;
  flex-direction: column;
	background-color: #f6f7fb;
	border-radius: 15px;
	width: 300px;
  height: 369px;
	padding: 30px 19px 30px 19px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	z-index: 1001;
	gap: 25px;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
`;

const Title = styled.h2`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: normal;
	color: #555;
	margin: 0;
`;

const Description = styled.h3`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin: 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const ManittoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const ImageWrapper = styled.div`
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors['submain']};
	border-radius: 50%;
`;

const ProfileImage = styled.img`
	width: 60px;
	height: 60px;
	object-fit: cover;
	border-radius: 50%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px
`

const SubText = styled.div`
	font-family: 'LINESeed';
	font-size: 16px;
	font-weight: 300;
`;

const ProfileText = styled.div`
	font-family: 'LINESeed';
	font-size: 20px;
	font-weight: normal;
`;

const ParticipantsContainer = styled.div<{ $isOverflow: boolean }>`
	display: flex;
	align-items: center;
	justify-content: ${({ $isOverflow }) =>
		$isOverflow ? 'flex-start' : 'center'};
	width: 100%;
	height: 100px;
  border-radius: 12px;
	overflow-x: auto;
	white-space: nowrap;
	gap: 10px;
	background-color: #E1E9EF;

	&:active {
		cursor: grabbing;
	}
`;

const ParticipantBlank = styled.div`
	width: 12px;
	height: auto;
`;

const Participant = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  cursor: pointer;
`;

const ParticipantName = styled.div`
	margin-top: 5px;
	font-family: 'SB어그로';
	font-size: 12px;
	font-weight: 300;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ButtonProps {
  $selectedNumber: number;
}

const ButtonBox = styled.button<ButtonProps>`
  width: 116px;
  height: 35px;
  border-radius: 15px;
  border: none;
  background-color: ${({ $selectedNumber }) => $selectedNumber >= 0 ? '#90D4B9' : '#E1E9EF' };
  font-family: 'GmarketSans';
  font-size: 16px;
  font-weight: bold;
  color: white;
  line-height: 35px;
  cursor: ${({ $selectedNumber }) => $selectedNumber >= 0 ? 'pointer' : 'not-allowed' };
`