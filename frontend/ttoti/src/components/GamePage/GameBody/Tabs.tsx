// Tabs.tsx
import React from 'react';
import styled, { useTheme } from 'styled-components';

import PorcupineGif from '@assets/gamecloud/PorcupineGif.gif';
import RabbitGif from '@assets/gamecloud/RabbitGif.gif';
import OwlGif from '@assets/gamecloud/OwlGif.gif';

const TabContainer = styled.div`
  display: flex;
  justify-self: center;
  justify-content: space-around;
  position: relative;
  margin-bottom: -0.6px;
  width: 360px;
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tab = styled.button<{ color: string; $isActive: boolean }>`
  width: 108px;
  height: 40px;
  background-color: ${({ color }) => color};
  font-family: 'SB어그로';
  font-weight: 300;
  font-size: 16px;
  color: white;
  border: 1px solid black;
  border-bottom: ${({ $isActive }) => ($isActive ? 'none' : '1px solid black')};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const TabImage = styled.img<{ $isShifted: boolean }>`
  width: 60px;
  height: 60px;
  position: absolute;
  top: ${({ $isShifted }) => ($isShifted ? '-20px' : '-60px')}; /* 선택되지 않은 경우 20px 아래로 이동 */
  transition: top 0.3s;
  z-index: 1;
`;

interface TabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChangeTab }) => {
  const theme = useTheme();

  // 탭 데이터 정의
  const tabData = [
    { key: 'quiz', label: '퀴즈', color: theme.colors.quiz, image: PorcupineGif },
    { key: 'manitto', label: '마니또', color: theme.colors.manitoChat, image: RabbitGif },
    { key: 'maniti', label: '마니띠', color: theme.colors.manitiChat, image: OwlGif },
  ];

  // 각 탭의 선택에 따른 이미지 이동 설정
  const getIsShifted = (tabKey: string, currentKey: string) => {
    if (tabKey === 'quiz') return currentKey === 'manitto' || currentKey === 'maniti';
    if (tabKey === 'manitto') return currentKey === 'quiz' || currentKey === 'maniti';
    if (tabKey === 'maniti') return currentKey === 'quiz' || currentKey === 'manitto';
    return false;
  };

  return (
    <TabContainer>
      {tabData.map((tab) => (
        <TabWrapper key={tab.key}>
          <TabImage src={tab.image} alt={tab.label} $isShifted={getIsShifted(activeTab, tab.key)} />
          <Tab
            onClick={() => onChangeTab(tab.key)}
            color={tab.color}
            $isActive={activeTab === tab.key}
          >
            {tab.label}
          </Tab>
        </TabWrapper>
      ))}
    </TabContainer>
  );
};

export default Tabs;
