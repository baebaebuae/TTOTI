// src/types/EndingData.ts

export interface EndingProps {
  roomEnding: {
    id: number;
    roomName: string;
    roomParticipants: number;
    roomStartDate: string;
    roomStartTime: string;
    roomFinishDate: string;
    roomFinishTime: string;
    ttotiList: {
      manitto: MemberInfo;
      maniti: MemberInfo;
    }[];
    bestCorrectScore: number;
    bestCorrectMemberList: MemberInfo[];
    bestChatCount: number;
    bestChatMemberList: MemberInfo[];
    bestFinalTemperature: number;
    bestTemperatureMemberList: MemberInfo[];
  };
  manittoQuizList: Quiz[];
  manitiQuizList: Quiz[];
  midGuess: Guess | null;
  finalGuess: Guess;
  endingCorrectScore: number;
  endingChatCount: number;
  endingFinalTemperature: number;
}

export interface MemberInfo {
  memberId: string;
  memberName: string;
  memberProfileImageUrl: string;
}

export interface Quiz {
  ttotiId: number;
  quizId: number;
  quizDate: string;
  quizChoiceContent: string;
  quizType: "TWO_CHOICE" | string;
  quizChoiceMap: {
    [key: string]: string;
  };
  isManittoAnswered: boolean;
  manittoAnswer: string | null;
  isManitiAnswered: boolean;
  manitiAnswer: string | null;
  quizAnswerIsCorrect: boolean;
}

export interface Guess {
  guessMember: MemberInfo | null;
  guessIsCorrect: boolean;
  guessIsFinal: boolean;
  guessDate: string;
  guessIsAnswered: boolean;
  guessAnswerAt: string | null;
}
