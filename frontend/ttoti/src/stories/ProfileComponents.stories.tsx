// src/stories/ProfileContainer.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import ProfileContainer from '@components/common/ProfileComponents';
import { ProfileContainerProps } from '@components/common/ProfileComponents'; // 올바른 경로 확인
import profile1 from '../assets/profiles/profile1.png'
import profile2 from '../assets/profiles/profile2.png'
import profile3 from '../assets/profiles/profile3.png'
import profile4 from '../assets/profiles/profile4.png'

const meta: Meta<ProfileContainerProps> = {
  title: 'Profile/ProfileContainer',
  component: ProfileContainer,
};

export default meta;

// ProfileContainer 컴포넌트 템플릿
const Template: StoryFn<ProfileContainerProps> = (args) => <ProfileContainer {...args} />;

// 기본 ProfileContainer 예시
export const Default = Template.bind({});
Default.args = {
  src: profile1,
  size: '100px',
  ready: false,
};

// 준비 상태가 활성화된 예시
export const Ready = Template.bind({});
Ready.args = {
  src: profile2,
  size: '100px',
  ready: true,
};

// 다양한 크기의 프로필 예시
export const Small = Template.bind({});
Small.args = {
  src: profile3,
  size: '50px',
  ready: false,
};

export const Large = Template.bind({});
Large.args = {
  src: profile4,
  size: '150px',
  ready: true,
};
