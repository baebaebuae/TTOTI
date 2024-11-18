// QuizBody.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import QuizBody from '../components/GamePage/GameBody/QuizBody';
import { QuizData } from 'src/types/QuizTypes'; // QuizData 타입 import

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

// QuizBody의 Props 타입 정의
interface QuizBodyProps {
  page: number; // QuizBody에서 사용할 props 정의
  quizData: QuizData; // quizData 추가
}

// Storybook 메타데이터 설정
const meta: Meta<typeof QuizBody> = {
  title: 'Quiz/QuizBody',
  component: QuizBody,
};

export default meta;

// Template 생성
const Template: StoryFn<QuizBodyProps> = (args) => <QuizBody {...args} />;

// 각 스토리 정의
export const ManitoPage = Template.bind({});
ManitoPage.args = {
  page: 0, // isManito가 true인 경우
  quizData: mockQuizData, // quizData props 추가
};

export const OtherPage = Template.bind({});
OtherPage.args = {
  page: 1, // isManito가 false인 경우
  quizData: mockQuizData, // quizData props 추가
};
