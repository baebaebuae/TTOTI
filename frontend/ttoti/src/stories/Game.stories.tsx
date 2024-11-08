// src/stories/Game.stories.tsx
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
    "roomHostMemberName": "정진영",
    "roomName": "99NULL",
    "ttotiMatchInfo": {
      "myTtotiId": 1,
      "myTittoId": 2,
      "myManittoAnimalName": "금붕어",
      "myManittoAnimalImageUrl": "http://sample.com",
      "myName": "정진영",
    }
  }

// 스토리 1: 기본 게임 화면
const Template: StoryFn<typeof Game> = () => (
  <ThemeProvider theme={theme}>
    <Game quizData={mockQuizData} roomInfo={mockRoomInfo}/> {/* quizData prop 전달 */}
  </ThemeProvider>
);

// 기본 예시
export const Default = Template.bind({});
