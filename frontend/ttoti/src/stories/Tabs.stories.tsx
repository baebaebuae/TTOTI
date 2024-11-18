// src/stories/Tabs.stories.tsx
import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tabs from '@components/GamePage/GameBody/Tabs';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';

const meta: Meta<typeof Tabs> = {
  title: 'Game/Tabs',
  component: Tabs,
};

export default meta;

// 스토리 1: 기본 탭
const Template: StoryFn<{ activeTab: string; onChangeTab: (tab: string) => void }> = (args) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
    args.onChangeTab(tab); // 부모 컴포넌트에 변경 사항 알림
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs activeTab={activeTab} onChangeTab={handleChangeTab} />
    </ThemeProvider>
  );
};

// 기본 예시
export const Default = Template.bind({});
Default.args = {
  activeTab: 'quiz',
  onChangeTab: (tab: string) => console.log(`Changed to tab: ${tab}`),
};
