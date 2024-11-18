// src/stories/ListBox.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import ListBox from '@components/common/box/ListBox'; // ListBox 컴포넌트 경로에 맞게 수정하세요.
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 경로에 맞게 수정하세요.

const meta: Meta<typeof ListBox> = {
  title: 'Components/ListBox',
  component: ListBox,
  decorators: [(Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>],
};

export default meta;

// 스토리 템플릿
const Template: StoryFn<{ size?: 'large' | 'small'; ListText: string }> = (args) => (
  <ListBox {...args} />
);

// 작은 사이즈의 ListBox 예시
export const Small = Template.bind({});
Small.args = {
  size: 'small',
  ListText: '작은 리스트',
};

// 큰 사이즈의 ListBox 예시
export const Large = Template.bind({});
Large.args = {
  size: 'large',
  ListText: '큰 리스트',
};
