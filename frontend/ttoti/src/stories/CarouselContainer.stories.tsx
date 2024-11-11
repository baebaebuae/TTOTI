// CarouselContainer.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import CarouselContainer from '@components/GamePage/GameBody/CarouselContainer';

import { RoomInfo } from 'src/types/RoomInfo';

const meta: Meta<typeof CarouselContainer> = {
  title: 'Quiz/CarouselContainer',
  component: CarouselContainer,
};

export default meta;

type CarouselContainerProps = {
  page: number;
  roomInfo: RoomInfo;
};

// Template 생성
const Template: StoryFn<CarouselContainerProps> = (args) => <CarouselContainer {...args} />;

// 각 스토리 정의
export const ManitoPage = Template.bind({});
ManitoPage.args = {
  page: 0, // 마니또 페이지
};

export const OtherPage = Template.bind({});
OtherPage.args = {
  page: 1, // 마니띠 페이지
};
