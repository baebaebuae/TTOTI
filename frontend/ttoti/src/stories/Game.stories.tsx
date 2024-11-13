// src/stories/Game.stories.tsx
import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Game from '@components/GamePage/Game';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { QuizData } from 'src/types/QuizTypes'; // QuizData 타입 import
import { RoomInfo } from 'src/types/RoomInfo';

const meta: Meta<typeof Game> = {
  title: 'Game/Game',
  component: Game,
};

export default meta;

// Mock QuizData
const mockQuizData: QuizData = {
  "manittoQuizList": [
      {
          "ttotiId": 1,
          "quizId": 1,
          "quizDate": "2024-11-01",
          "quizChoiceContent": "약 먹을 때 먼저 먹는 것은?",
          "quizType": "TWO_CHOICE",
          "quizChoiceMap": {
              "1": "약",
              "2": "물"
          },
          "isManittoAnswered": true,
          "manittoAnswer": 1,
          "isManitiAnswered": true,
          "manitiAnswer": 2,
          "quizAnswerIsCorrect": false
      },
      {
          "ttotiId": 1,
          "quizId": 2,
          "quizDate": "2024-10-31",
          "quizChoiceContent": "가장 가지고 싶은 초능력은?",
          "quizType": "FOUR_CHOICE",
          "quizChoiceMap": {
              "1": "순간이동",
              "2": "1분마다 10만원씩 자동 입금",
              "3": "평생 병에 안 걸림",
              "4": "다른 사람의 생각이 들림"
          },
          "isManittoAnswered": true,
          "manittoAnswer": 1,
          "isManitiAnswered": true,
          "manitiAnswer": 2,
          "quizAnswerIsCorrect": false
      }
  ],
  "manitiQuizList": [
      {
          "ttotiId": 8,
          "quizId": 1,
          "quizDate": "2024-11-01",
          "quizChoiceContent": "약 먹을 때 먼저 먹는 것은?",
          "quizType": "TWO_CHOICE",
          "quizChoiceMap": {
              "1": "약",
              "2": "물"
          },
          "isManittoAnswered": true,
          "manittoAnswer": 1,
          "isManitiAnswered": true,
          "manitiAnswer": 1,
          "quizAnswerIsCorrect": true
      },
      {
          "ttotiId": 8,
          "quizId": 2,
          "quizDate": "2024-10-31",
          "quizChoiceContent": "가장 가지고 싶은 초능력은?",
          "quizType": "FOUR_CHOICE",
          "quizChoiceMap": {
              "1": "순간이동",
              "2": "1분마다 10만원씩 자동 입금",
              "3": "평생 병에 안 걸림",
              "4": "다른 사람의 생각이 들림"
          },
          "isManittoAnswered": true,
          "manittoAnswer": 1,
          "isManitiAnswered": true,
          "manitiAnswer": 1,
          "quizAnswerIsCorrect": true
      }
  ],
  "todayManittoQuiz": {
      "ttotiId": 1,
      "quizId": 3,
      "quizDate": "2024-11-02",
      "quizChoiceContent": "영화를 같이 보러 가는 사람은?",
      "quizType": "FOUR_CHOICE",
      "quizChoiceMap": {
          "1": "친구",
          "2": "가족",
          "3": "연인",
          "4": "혼자"
      },
      "isManittoAnswered": false,
      "manittoAnswer": null,
      "isManitiAnswered": false,
      "manitiAnswer": null,
      "quizAnswerIsCorrect": false
  },
  "todayManitiQuiz": {
      "ttotiId": 8,
      "quizId": 3,
      "quizDate": "2024-11-02",
      "quizChoiceContent": "영화를 같이 보러 가는 사람은?",
      "quizType": "FOUR_CHOICE",
      "quizChoiceMap": {
          "1": "친구",
          "2": "가족",
          "3": "연인",
          "4": "혼자"
      },
      "isManittoAnswered": false,
      "manittoAnswer": null,
      "isManitiAnswered": false,
      "manitiAnswer": null,
      "quizAnswerIsCorrect": false
  }
};

const mockRoomInfo: RoomInfo = {
    "roomHostMemberName": "오뜨1",
      "roomName": "마니또방1",
      "ttotiMatchInfo": {
        "myTtotiId": 5,
        "myTittoId": 4,
        "myManittoAnimalName": "겸손한 토끼3",
        "myManittoAnimalImageUrl": "https://example.com/images/rabbit.jpg",
        "myName": "오뜨1",
        "myProfileImageUrl": "http://example.com/user1.jpg",
        "myAnimalName": "활발한 고양이1",
        "myAnimalImageUrl": "https://example.com/images/cat.jpg",
        "myManitiMemberName": "카스타드8",
        "myManitiProfileImageUrl": "http://example.com/user8.jpg"
      }
    }

// 스토리 1: 기본 게임 화면
const Template: StoryFn<typeof Game> = () => {
    const [activeTab, setActiveTab] = useState('quiz'); // 초기 탭 설정
  
    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Game
          quizData={mockQuizData}
          roomInfo={mockRoomInfo}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
        />
      </ThemeProvider>
    );
  };

// 기본 예시
export const Default = Template.bind({});
