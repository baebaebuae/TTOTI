// QuizContent.tsx
import React from 'react';
import styled from 'styled-components';

import ToggleIcon from '@assets/icons/toggle.svg?react';
import ToggleActiveIcon from '@assets/icons/toggle_active.svg?react';

import CarouselContainer from './CarouselContainer'; // 새로 분리한 CarouselContainer import
import QuizBody from './QuizBody';

import { QuizData } from "src/types/QuizTypes"; // QuizData 타입 import
import { RoomInfo } from 'src/types/RoomInfo';

interface QuizContentProps {
  page: number;
  togglePage: (direction: 'next' | 'prev') => void;
  quizData: QuizData | null;
  roomInfo: RoomInfo;
}

const BodyWrapper = styled.div`
  position: absolute;
  top: 43px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const SelectContainer = styled.div`
  width: 340px;
  height: 155px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuizContainer = styled.div`
  width: 280px;
  height: 320px;
`;

const IconButton = styled.button<{ $isLeft?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  transform: ${(props) => (props.$isLeft ? 'rotate(180deg)' : 'none')};
`;

const QuizContent: React.FC<QuizContentProps> = ({ page, togglePage, quizData, roomInfo }) => {
  return (
    <BodyWrapper>
      <SelectContainer>
        <IconButton $isLeft onClick={() => togglePage('prev')}>
          {/* 페이지가 0이면 왼쪽 아이콘에 ToggleActiveIcon 사용 */}
          {page === 0 ? <ToggleIcon /> : <ToggleActiveIcon />}
        </IconButton>
        <CarouselContainer page={page} roomInfo={roomInfo}/> {/* 분리한 CarouselContainer 사용 */}
        <IconButton onClick={() => togglePage('next')}>
          {/* 페이지가 0이 아닐 때 오른쪽 아이콘에 ToggleActiveIcon 사용 */}
          {page === 0 ? <ToggleActiveIcon /> : <ToggleIcon />}
        </IconButton>
      </SelectContainer>
      <QuizContainer>
        <QuizBody page={page} quizData={quizData} />
      </QuizContainer>
    </BodyWrapper>
  );
};

export default QuizContent;
