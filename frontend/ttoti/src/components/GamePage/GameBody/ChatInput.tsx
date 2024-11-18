// ChatInput.tsx
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import SendMessage from '@assets/icons/send_message.svg?react'

const InputContainer = styled.div<{ $backgroundColor: string }>`
  width: 378px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-top: 3px solid black;
  border-radius: 0 0 9px 9px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  margin-left: 25px; 
  border: 2px solid #e1e9ef;
  border-radius: 15px;
  outline: none;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  margin-right: 15px;
  padding: 8px;
  cursor: pointer;
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer $backgroundColor={theme.colors.submain}>
      <InputField
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <SendButton onClick={handleSendMessage}>
        <SendMessage />
      </SendButton>
    </InputContainer>
  );  
};

export default ChatInput;
