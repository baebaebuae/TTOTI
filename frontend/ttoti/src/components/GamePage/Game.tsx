// Game.tsx
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 파일 경로에 맞게 조정

import Tabs from './GameBody/Tabs';
import TabContent from './GameBody/TabContent';

import { QuizData } from "src/types/QuizTypes"; // QuizData 타입 import
import { RoomInfo } from 'src/types/RoomInfo';

interface GameProps {
  quizData: QuizData | null;
  roomInfo: RoomInfo;
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Game: React.FC<GameProps> = ({ quizData, roomInfo, activeTab, onChangeTab }) => {

  return (
    <ThemeProvider theme={theme}>
      <Tabs activeTab={activeTab} onChangeTab={onChangeTab} />
      <TabContent activeTab={activeTab} quizData={quizData} roomInfo={roomInfo}/>
    </ThemeProvider>
  );
};

export default Game;
