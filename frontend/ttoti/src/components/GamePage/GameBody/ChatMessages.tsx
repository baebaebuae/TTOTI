import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ChatMessagesProps {
  target: 'manitto' | 'maniti';
  messages: { sendTime: string; senderId: 'manitto' | 'maniti'; content: string }[];
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

const MessageBox = styled.div<{ $isOwnMessage: boolean }>`
  display: flex;
  flex-direction: ${({ $isOwnMessage }) => ($isOwnMessage ? 'row' : 'row-reverse')};
  justify-content: flex-end;
  align-items: end;
  margin-bottom: 10px;
  gap: 5px;
`;

const TimeStamp = styled.div`
  font-size: 12px;
  height: 10px;
  margin-bottom: 18px;
`;

const MessageBubble = styled.div<{ $isOwnMessage: boolean }>`
  position: relative;
  font-family: 'SB 어그로';
  font-weight: 300;
  background-color: white;
  color: #333;
  padding: 10px;
  border-radius: 15px;
  font-size: 16px;
  max-width: 70%;
  min-width: 40px;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 13px 10px 0 10px;
    border-color: white transparent transparent transparent;
    transform: ${({ $isOwnMessage }) => ($isOwnMessage ? 'matrix(0, 1, -1, 0, 0, 0)' : 'matrix(0, -1, 1, 0, 0, 0)')};
    bottom: -3px;
    left: ${({ $isOwnMessage }) => ($isOwnMessage ? 'auto' : '0px')};
    right: ${({ $isOwnMessage }) => ($isOwnMessage ? '0' : 'auto')};
  }
`;

const DateLabel = styled.div`
  font-family: "SB 어그로";
  font-size: 12px;
  font-weight: normal;
  height: 20px;
  width: 90px;
  background-color: #7984FC;
  text-align: center;
  padding-top: 8px;
  margin-top: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-left: 128px;
`;

const ChatMessages: React.FC<ChatMessagesProps> = ({ target, messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (sendTime: string) => {
    const date = new Date(sendTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;

    return `${period} ${formattedHours}:${minutes}`;
  };

  const groupMessagesByDate = (messages: { sendTime: string; senderId: 'manitto' | 'maniti'; content: string }[]) => {
    return messages.reduce((acc, message) => {
      const date = new Date(message.sendTime);
      const dateString = date.toISOString().split('T')[0];
      if (!acc[dateString]) {
        acc[dateString] = [];
      }
      acc[dateString].push(message);
      return acc;
    }, {} as Record<string, typeof messages>);
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <MessageContainer ref={containerRef}>
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          {/* 날짜 표시 */}
          <DateLabel>{date}</DateLabel>
          {/* 날짜별 메시지들 */}
          {groupedMessages[date].map((message, index) => (
            <MessageBox key={index} $isOwnMessage={message.senderId !== target}>
              <TimeStamp>
                {formatTime(message.sendTime)}
              </TimeStamp>
              <MessageBubble $isOwnMessage={message.senderId !== target}>
                {message.content}
              </MessageBubble>
            </MessageBox>
          ))}
        </div>
      ))}
    </MessageContainer>
  );
};

export default ChatMessages;
