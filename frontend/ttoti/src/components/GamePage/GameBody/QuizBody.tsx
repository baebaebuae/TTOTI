import styled from "styled-components";
import React, { useState, useEffect } from 'react';

import ToggleIcon from '@assets/icons/toggle.svg?react';
import ToggleActiveIcon from '@assets/icons/toggle_active.svg?react';

import { QuizData, Quiz } from "src/types/QuizTypes";

import choiceAnswer from "@services/apiSelectChoice";

interface CarouselContainerProps {
  page: number;
  quizData: QuizData | null;
}

const Container = styled.div<{ $page: number }>`
  width: 280px;
  height: 320px;
  border-radius: 12px;
  border: 1px solid black;
  font-family: "LineSeed";
  background-color: white;
  color: black;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 수정: 위쪽 정렬 */
`;

const QuizHeader = styled.div`
  display: flex;
  margin-top: 16px; /* 삭제: margin-top을 삭제하고 간격을 아래에서 설정 */
  align-items: center;
  justify-content: space-around;
  width: 100%;
  position: sticky; /* 고정 위치 설정 */
  top: 0; /* 스크롤 시 상단 고정 */
  z-index: 1; /* 다른 요소보다 위에 있도록 설정 */
`;

const QuizDateBox = styled.div`
  width: 140px;
  height: 22px;
  border-radius: 15px;
  background-color: #7984FC;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 5px; /* 패딩 추가 */
`;

const QuizDate = styled.span`
  margin-top: 3px;
  font-size: 16px; /* 폰트 크기 추가 */
  font-weight: bold; /* 볼드 스타일 추가 */
`;

const QuizBodyContainer = styled.div`
  margin-top: 16px; /* QuizHeader와의 간격을 설정 */
  flex-grow: 1; /* 공간을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FourChoiceQuizBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;
  
const TwoChoiceQuizBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  `;
  
// 버튼 스타일을 조건에 따라 동적으로 적용하기 위해 props를 추가합니다.
const FourChoiceButton = styled.button<{
  $isTodayQuiz: boolean;
  $isMatching: boolean;
  $isManitoAnswer: boolean;
  $isManitiAnswer: boolean;
  $isSelected: boolean;
}>`
  width: 200px;
  height: 30px;
  margin-top: 3px;
  border-radius: 10px;
  border: ${({ $isMatching }) => ($isMatching ? '2px solid red' : 'none')};
  background-color: ${({ $isTodayQuiz, $isSelected, $isMatching, $isManitoAnswer, $isManitiAnswer }) =>
    $isTodayQuiz && $isSelected ? '#67C431' : // 선택된 답변 강조 (노란색) - 오늘의 퀴즈인 경우에만
    $isMatching ? '#67C431' :
    $isManitoAnswer ? '#67C431' :
    $isManitiAnswer ? '#FF6430' :
    '#E1E9EF'};
`;



const TwoChoiceButton = styled(FourChoiceButton)`
  width: 90px;
  height: 90px;
  border: ${({ $isMatching }) => ($isMatching ? '2px solid red' : '1px solid black')};
`;
const OXButton = styled(FourChoiceButton)`
  width: 90px;
  height: 90px;
  border: ${({ $isMatching }) => ($isMatching ? '2px solid red' : '1px solid black')};
`;

const FourChoiceQuiz: React.FC<{ 
  $page: number; 
  quiz: Quiz; 
  $isTodayQuiz: boolean; 
  selectedAnswer: string | null; 
  onSelectAnswer: (answer: string) => void; 
}> = ({ $page, quiz, $isTodayQuiz, selectedAnswer, onSelectAnswer }) => {
  const { manittoAnswer, manitiAnswer } = quiz;
  const $isMatching = manittoAnswer === manitiAnswer;

  useEffect(() => {
    const chooseAnswer = async () => {
      try {
        if (selectedAnswer) {
          const response = await choiceAnswer(quiz.ttotiId, quiz.quizId, Number(selectedAnswer));
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    }

    chooseAnswer();

  }, [quiz.ttotiId, quiz.quizId, selectedAnswer])
  return (
    <div>
      <h2>나의 선택은 ?</h2>
      <p>{quiz.quizChoiceContent}</p>
      <FourChoiceQuizBody>
        {Object.keys(quiz.quizChoiceMap).map((key) => (
          <FourChoiceButton
            key={key}
            $isTodayQuiz={$isTodayQuiz}
            $isMatching={$isMatching && key === manittoAnswer?.toString()}
            $isManitoAnswer={$page === 0 ? key === manittoAnswer?.toString() : key === manitiAnswer?.toString()}
            $isManitiAnswer={$page === 0 ? key === manitiAnswer?.toString() : key === manittoAnswer?.toString()}
            $isSelected={selectedAnswer === key} // 선택된 상태 전달
            onClick={() => onSelectAnswer(key)} // 클릭 시 선택 상태 업데이트
          >
            {quiz.quizChoiceMap[key]}
          </FourChoiceButton>
        ))}
      </FourChoiceQuizBody>
    </div>
  );
};

const TwoChoiceQuiz: React.FC<{ $page: number; quiz: Quiz; $isTodayQuiz: boolean; selectedAnswer: string | null; onSelectAnswer: (answer: string) => void }> = ({ $page, quiz, $isTodayQuiz, selectedAnswer, onSelectAnswer }) => {
  const { manittoAnswer, manitiAnswer } = quiz;
  const $isMatching = manittoAnswer === manitiAnswer;
  
  useEffect(() => {
    const chooseAnswer = async () => {
      try {
        if (selectedAnswer) {
          const response = await choiceAnswer(quiz.ttotiId, quiz.quizId, Number(selectedAnswer));
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    }

    chooseAnswer();

  }, [quiz.ttotiId, quiz.quizId, selectedAnswer])

  return (
    <div>
      <h2>나의 선택은 ?</h2>
      <p>{quiz.quizChoiceContent}</p>
      <TwoChoiceQuizBody>
        {Object.keys(quiz.quizChoiceMap).map((key) => (
          <TwoChoiceButton
            key={key}
            $isTodayQuiz={$isTodayQuiz}
            $isMatching={$isMatching && key === manittoAnswer?.toString()}
            $isManitoAnswer={$page === 0 ? key === manittoAnswer?.toString() : key === manitiAnswer?.toString()}
            $isManitiAnswer={$page === 0 ? key === manitiAnswer?.toString() : key === manittoAnswer?.toString()}
            $isSelected={selectedAnswer === key} // 선택된 상태 전달
            onClick={() => onSelectAnswer(key)} // 클릭 시 선택 상태 업데이트
          >
            {quiz.quizChoiceMap[key]}
          </TwoChoiceButton>
        ))}
      </TwoChoiceQuizBody>
    </div>
  );
};

const OXQuiz: React.FC<{ $page: number; quiz: Quiz; $isTodayQuiz: boolean; selectedAnswer: string | null; onSelectAnswer: (answer: string) => void }> = ({ $page, quiz, $isTodayQuiz, selectedAnswer, onSelectAnswer }) => {
  const { manittoAnswer, manitiAnswer } = quiz;
  const $isMatching = manittoAnswer === manitiAnswer;

  return (
    <div>
      <p>{quiz.quizChoiceContent}</p>
      <div>
        {Object.keys(quiz.quizChoiceMap).map((key) => (
          <OXButton
            key={key}
            $isTodayQuiz={$isTodayQuiz}
            $isMatching={$isMatching && key === manittoAnswer?.toString()}
            $isManitoAnswer={$page === 0 ? key === manittoAnswer?.toString() : key === manitiAnswer?.toString()}
            $isManitiAnswer={$page === 0 ? key === manitiAnswer?.toString() : key === manittoAnswer?.toString()}
            $isSelected={selectedAnswer === key} // 선택된 상태 전달
            onClick={() => onSelectAnswer(key)} // 클릭 시 선택 상태 업데이트
          >
            {quiz.quizChoiceMap[key]}
          </OXButton>
        ))}
      </div>
    </div>
  );
};


const QuizBody: React.FC<CarouselContainerProps> = ({ page, quizData }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // 선택한 버튼 상태 추가

  const isManito = page === 0;
  const todayQuiz = isManito ? quizData?.todayManittoQuiz : quizData?.todayManitiQuiz;
  const quizList = isManito ? quizData?.manittoQuizList : quizData?.manitiQuizList;

  const combinedQuizzes = todayQuiz ? [todayQuiz, ...(quizList || [])] : quizList || [];
  const quiz = combinedQuizzes[currentQuizIndex];

  const $isTodayQuiz = quiz === todayQuiz;
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer); // 선택한 답을 상태로 저장
  };

  const renderQuiz = (quiz: Quiz) => {
    switch (quiz.quizType) {
      case "TWO_CHOICE":
        return <TwoChoiceQuiz $page={page} quiz={quiz} $isTodayQuiz={$isTodayQuiz} selectedAnswer={selectedAnswer} onSelectAnswer={handleAnswerSelect} />;
      case "FOUR_CHOICE":
        return <FourChoiceQuiz $page={page} quiz={quiz} $isTodayQuiz={$isTodayQuiz} selectedAnswer={selectedAnswer} onSelectAnswer={handleAnswerSelect} />;
      case "OX":
        return <OXQuiz $page={page} quiz={quiz} $isTodayQuiz={$isTodayQuiz} selectedAnswer={selectedAnswer} onSelectAnswer={handleAnswerSelect} />;
      default:
        return <p>Unknown quiz type</p>;
    }
  };

  const handlePrev = () => {
    if (combinedQuizzes.length > 0 && currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  const handleNext = () => {
    if (combinedQuizzes.length > 0 && currentQuizIndex < combinedQuizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  return (
    <Container $page={page}>
      <QuizHeader>
        {currentQuizIndex > 0 ? (
          <ToggleActiveIcon onClick={handlePrev} style={{ cursor: 'pointer', transform: 'scaleX(-1)'}} />
        ) : (
          <ToggleIcon onClick={handlePrev} style={{ cursor: 'not-allowed', opacity: 0.5, transform: 'scaleX(-1)' }} />
        )}
        <QuizDateBox>
          <QuizDate>{quiz === todayQuiz ? "오늘의 퀴즈" : `${quiz?.quizDate} 퀴즈`}</QuizDate>
        </QuizDateBox>
        {currentQuizIndex < combinedQuizzes.length - 1 ? (
          <ToggleActiveIcon onClick={handleNext} style={{ cursor: 'pointer' }} />
        ) : (
          <ToggleIcon onClick={handleNext} style={{ cursor: 'not-allowed', opacity: 0.5 }} />
        )}
      </QuizHeader>
      <QuizBodyContainer>
        {quiz ? (
          renderQuiz(quiz)
        ) : (
          <p>퀴즈를 불러오는 중...</p>
        )}
      </QuizBodyContainer>
    </Container>
  );
};

export default QuizBody;
