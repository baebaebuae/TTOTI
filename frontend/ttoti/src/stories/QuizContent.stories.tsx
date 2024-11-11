// QuizContent.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import QuizContent from '@components/GamePage/GameBody/QuizContent';
import { QuizData } from 'src/types/QuizTypes'; // QuizData 타입 import
import { RoomInfo } from 'src/types/RoomInfo';

// Mock data for quizData
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

const meta: Meta<typeof QuizContent> = {
  title: 'Quiz/QuizContent',
  component: QuizContent,
};

export default meta;

interface QuizContentProps {
  page: number;
  togglePage: (direction: 'next' | 'prev') => void;
  quizData: QuizData; // quizData 추가
  roomInfo: RoomInfo;
}

// Template 생성
const Template: StoryFn<QuizContentProps> = (args) => <QuizContent {...args} />;

// 각 스토리 정의
export const Default = Template.bind({});
Default.args = {
  page: 0,
  togglePage: (direction: 'next' | 'prev') => {
    console.log(`Toggle to ${direction}`);
  },
  quizData: mockQuizData, // quizData props 추가
};

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  page: 1,
  togglePage: (direction: 'next' | 'prev') => {
    console.log(`Toggle to ${direction}`);
  },
  quizData: mockQuizData, // quizData props 추가
};
