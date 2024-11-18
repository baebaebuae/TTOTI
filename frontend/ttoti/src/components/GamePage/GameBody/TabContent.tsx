import React, { useState, useEffect, createContext } from 'react';
import styled, { useTheme } from 'styled-components';

import QuizContent from './QuizContent';
import ChatContent from './ChatContent';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { QuizData } from "src/types/QuizTypes";
import { RoomInfo } from 'src/types/RoomInfo';

interface TabContentProps {
  activeTab: string;
  quizData: QuizData | null;
  roomInfo: RoomInfo;
}

const ContentContainer = styled.div<{ $backgroundColor: string }>`
  width: 380px;
  height: 500px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const WebSocketContext = createContext<Client | null>(null);

const TabContent: React.FC<TabContentProps> = ({ activeTab, quizData, roomInfo }) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  let backgroundColor;

  switch (activeTab) {
    case 'quiz':
      backgroundColor = theme.colors.quiz;
      break;
    case 'manitto':
      backgroundColor = theme.colors.manitoChat;
      break;
    case 'maniti':
      backgroundColor = theme.colors.manitiChat;
      break;
    default:
      backgroundColor = '#FFFFFF';
  }

  const togglePage = (direction: 'next' | 'prev') => {
    setPage((prevPage) => (direction === 'next' ? Math.min(prevPage + 1, 1) : Math.max(prevPage - 1, 0)));
  };

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('https://ttoti.co.kr/chat'),
      // onConnect: () => console.log("Connected to WebSocket"),
      // onDisconnect: () => console.log("Disconnected from WebSocket"),
    });

    client.activate();
    setStompClient(client);
  
    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={stompClient}>
      <ContentContainer $backgroundColor={backgroundColor}>
        {activeTab === 'quiz' && <QuizContent page={page} togglePage={togglePage} quizData={quizData} roomInfo={roomInfo}/>}
        {activeTab === 'manitto' && <ChatContent target="manitto" roomInfo={roomInfo}/>}
        {activeTab === 'maniti' && <ChatContent target="maniti" roomInfo={roomInfo}/>}
      </ContentContainer>
    </WebSocketContext.Provider>
  );
};

export default TabContent;
