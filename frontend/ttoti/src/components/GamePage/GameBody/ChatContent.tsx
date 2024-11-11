import React, { useState, useEffect, useContext } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

import { WebSocketContext } from './TabContent'; // WebSocket 클라이언트를 관리하는 Context

import { RoomInfo } from 'src/types/RoomInfo';
import { getManitiChatList, getManittoChatList } from '@services/apiChatList';

interface ChatContentProps {
  target: 'manitto' | 'maniti';
  roomInfo: RoomInfo;
}

interface Message {
  senderId: 'manitto' | 'maniti';
  content: string;
  sendTime: string;
}

// API에서 반환되는 메시지 타입 정의
interface ApiMessage {
  role: 'manitto' | 'maniti';
  message: string;
  sendTime: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ target, roomInfo }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const stompClient = useContext(WebSocketContext); // WebSocket 클라이언트

  const chatId = target === 'manitto'
    ? `${roomInfo.ttotiMatchInfo.myTittoId}`
    : `${roomInfo.ttotiMatchInfo.myTtotiId}`;

  // 초기 채팅 리스트 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      const initialMessages: ApiMessage[] = target === 'manitto' 
        ? await getManitiChatList(Number(chatId))
        : await getManittoChatList(Number(chatId));
      
      setMessages(initialMessages.map((msg) => ({
        senderId: msg.role,
        content: msg.message,
        sendTime: msg.sendTime,
      })));
    };
    
    fetchChatList();
  }, [chatId, target]);

  // WebSocket 구독 및 메시지 수신
  useEffect(() => {
    if (stompClient) {
      // 메시지 구독
      const subscription = stompClient.subscribe(`/sub/sub-${chatId}`, (message) => {
        // console.log(message);
        const newMessage: ApiMessage = JSON.parse(message.body);
        // console.log('Received message:', newMessage);
        
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: newMessage.role,
            content: newMessage.message,
            sendTime: newMessage.sendTime,
          },
        ]);
      });

      // 컴포넌트 언마운트 시 구독 해제
      return () => {
        // console.log(`Unsubscribing from: /sub/sub-${chatId}`);
        subscription.unsubscribe();
      };
    }
  }, [stompClient, target, chatId]);

  const sendMessage = (message: string) => {
    if (stompClient) {
      const role = target === 'manitto' ? 'maniti' : 'manitto';
      // console.log(`Sending message to /pub/${role}/${chatId}:`, message);
      stompClient.publish({
        destination: `/pub/${role}/${chatId}`,
        body: JSON.stringify({ message: message }),
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 채팅 메시지 리스트 */}
      <ChatMessages target={target} messages={messages} />

      {/* 채팅 입력 필드 */}
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatContent;
