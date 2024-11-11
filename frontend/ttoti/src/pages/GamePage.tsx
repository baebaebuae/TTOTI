import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import RoomTitle from "@components/GamePage/RoomTitle/RoomTitle";
import Game from "@components/GamePage/Game";

import BigCloud from "@assets/gamecloud/big-cloud.png";
import SmallCloud from "@assets/gamecloud/small-cloud.png";

import { RoomInfo } from "src/types/RoomInfo";
import { QuizData } from "src/types/QuizTypes";

import getQuizData from "@services/apiQuizData";
import getInProgressRoomInfo from '@services/apiRoomInfo';


const GamePageContainer = styled.div`
  background-color: #1b95ec;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CloudImage = styled.img`
  position: absolute;
  top: 80px;
  left: 17px;
  width: 72px;
  height: auto;

  &:nth-child(2) {
    top: 113px;
    left: 113px;
  }
`;

const RoomTitleWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 250px;
  height: 75px;
  top: 62px;
  right: -12px;
`;

const GameWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
  height: 539px;
  top: 230px;
`;

const GamePage: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>();

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await getInProgressRoomInfo(roomId);
        setRoomInfo(response);
      } catch (error) {
        console.error("방 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchRoomInfo();
  }, [roomId]);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (roomInfo) {
        try {
          const data = await getQuizData(roomInfo.ttotiMatchInfo.myTtotiId);
          console.log('퀴즈 데이터:', data);
          setQuizData(data);
        } catch (error) {
          console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
        }
      }
    };
    
    fetchQuizData();
  }, [roomInfo]);

  return (
    <GamePageContainer>
      <CloudImage src={BigCloud} alt="big cloud" />
      <CloudImage src={SmallCloud} alt="small cloud" />
      <RoomTitleWrapper>
      {roomInfo &&
        <RoomTitle roomInfo={roomInfo}/>}
      </RoomTitleWrapper>
      <GameWrapper>
      {roomInfo &&
        <Game quizData={quizData} roomInfo={roomInfo}/>}
      </GameWrapper>
    </GamePageContainer>
  );
};

export default GamePage;
