// CreditPage.tsx
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getApiClient } from '@services/apiClient';
import styled from 'styled-components';
import HeartArrow from '@assets/icons/bi_heart-arrow.png';
import ProfileContainer from '@components/common/ProfileComponents';
import { EndingProps, Quiz } from 'src/types/EndingData';
import BackIconImage from '@assets/icons/back_icon.png'

const CreditPage = () => {
	const { id: roomId } = useParams<{ id: string }>();
	const [credit, setCredit] = useState<EndingProps | null>(null)
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
    const fetchRoomData = async () => {
      const apiClient = getApiClient();
      try {
        const res = await apiClient.get(`members/mypage/${roomId}`);
        if (res.status === 200) {
          setCredit(res.data.body);
        } else {
          console.error('API 요청 실패: ', res.status);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollTop = 0;

    const interval = setInterval(() => {
      scrollTop += 1; // ?px씩 이동
      scrollContainer.scrollTop = scrollTop;

      // 스크롤이 맨 끝에 도달하면 스크롤을 멈춤
      if (scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        clearInterval(interval);
      }
    }, 1); // ?ms마다 스크롤

    return () => clearInterval(interval);
  }, [credit]);

	if (!credit) return <div>로딩 중...</div>;


	const FourChoiceQuiz: React.FC<{
		quiz: Quiz;
	}> = ({ quiz }) => {
		let resultMessage = '';
		if (quiz.isManittoAnswered === false && quiz.isManitiAnswered === false) {
			resultMessage = '둘 다 답을 고르지 않았어요 !'
		} else if (quiz.isManittoAnswered === false) {
			resultMessage = '마니또가 답을 고르지 않았어요 !'
		} else if (quiz.isManitiAnswered === false) {
			resultMessage = '마니띠가 답을 고르지 않았어요 !'
		} else {
			resultMessage = quiz.quizAnswerIsCorrect
				? '서로 같은 답을 골랐네요 !'
				: '서로 다른 답을 골랐네요 ㅠ';
		}

		return (
			<QuizWrapper>
				<span style={{ marginTop: 10 }}>{quiz.quizChoiceContent}</span>
				<FourChoiceQuizBody>
					{Object.keys(quiz.quizChoiceMap).map((key) => (
						<FourChoiceButton
						key={key}
						$isMatching={key === quiz.manitiAnswer && key === quiz.manittoAnswer}
						$isManitoAnswer={quiz.isManittoAnswered}
						$isManitiAnswer={quiz.isManitiAnswered}
						>
							{quiz.quizChoiceMap[key]}
						</FourChoiceButton>
					))}
				</FourChoiceQuizBody>
				<ResultMessage>{resultMessage}</ResultMessage>
			</QuizWrapper>
		);
	};


	const TwoChoiceQuiz: React.FC<{
		quiz: Quiz;
	}> = ({ quiz }) => {
		let resultMessage = '';
		if (quiz.isManittoAnswered === false && quiz.isManitiAnswered === false) {
			resultMessage = '둘 다 답을 고르지 않았어요 !'
		} else if (quiz.isManittoAnswered === false) {
			resultMessage = '마니또가 답을 고르지 않았어요 !'
		} else if (quiz.isManitiAnswered === false) {
			resultMessage = '마니띠가 답을 고르지 않았어요 !'
		} else {
			resultMessage = quiz.quizAnswerIsCorrect
				? '서로 같은 답을 골랐네요 !'
				: '서로 다른 답을 골랐네요 ㅠ';
		}
	
		return (
			<QuizWrapper>
				<p style={{ alignSelf: "center", fontFamily: "LINESeed", fontSize: "16px", fontWeight: "bold" }}>{quiz.quizChoiceContent}</p>
				<TwoChoiceQuizBody>
					{Object.keys(quiz.quizChoiceMap).map((key) => (
						<TwoChoiceButton
							key={key}
							$isMatching={key === quiz.manitiAnswer && key === quiz.manittoAnswer}
							$isManitoAnswer={quiz.isManittoAnswered}
							$isManitiAnswer={quiz.isManitiAnswered}
						>
							{quiz.quizChoiceMap[key]}
						</TwoChoiceButton>
					))}
				</TwoChoiceQuizBody>
				<ResultMessage>{resultMessage}</ResultMessage>
			</QuizWrapper>
		);
	};


	const OXQuiz: React.FC<{
		quiz: Quiz;
	}> = ({ quiz }) => {
		let resultMessage = '';
		if (quiz.isManittoAnswered === false && quiz.isManitiAnswered === false) {
			resultMessage = '둘 다 답을 고르지 않았어요 !'
		} else if (quiz.isManittoAnswered === false) {
			resultMessage = '마니또가 답을 고르지 않았어요 !'
		} else if (quiz.isManitiAnswered === false) {
			resultMessage = '마니띠가 답을 고르지 않았어요 !'
		} else {
			resultMessage = quiz.quizAnswerIsCorrect
				? '서로 같은 답을 골랐네요 !'
				: '서로 다른 답을 골랐네요 ㅠ';
		}
	
		return (
			<QuizWrapper>
				<p>{quiz.quizChoiceContent}</p>
				<TwoChoiceQuizBody>
					{Object.keys(quiz.quizChoiceMap).map((key) => (
						<OXButton
							key={key}
							$isMatching={key === quiz.manitiAnswer && key === quiz.manittoAnswer}
							$isManitoAnswer={quiz.isManittoAnswered}
							$isManitiAnswer={quiz.isManitiAnswered}
						>
							{quiz.quizChoiceMap[key]}
						</OXButton>
					))}
				</TwoChoiceQuizBody>
				<ResultMessage>{resultMessage}</ResultMessage>
			</QuizWrapper>
		);
	};
	

	const renderQuiz = (quiz: Quiz) => {
		switch (quiz.quizType) {
			case 'TWO_CHOICE':
				return (
					<TwoChoiceQuiz quiz={quiz} />
				);
			case 'FOUR_CHOICE':
				return (
					<FourChoiceQuiz quiz={quiz} />
				);
			case 'OX':
				return (
					<OXQuiz quiz={quiz} />
				);
			default:
				return <p>Unknown quiz type</p>;
		}
	};

	
	const handleBack = () => {
		window.history.back();
	};

	return (
    <CreditOverlay ref={scrollRef}>
			<BackIcon onClick={handleBack} src={BackIconImage} alt="BackIcon" />
      <CreditContent>
				<Page>
					<PageTitle>- {credit.roomEnding.roomName} -</PageTitle>
					<PageText>
						시작 : {credit.roomEnding.roomStartDate} {credit.roomEnding.roomStartTime}
					</PageText>
					<PageText>
						종료 : {credit.roomEnding.roomFinishDate} {credit.roomEnding.roomFinishTime}
					</PageText>
				</Page>
				<Page>
					<PageTitle>참여 인원</PageTitle>
					<PageText>총 인원 : {credit.roomEnding.roomParticipants}</PageText>
					<PageText>마니또 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 마니띠</PageText>
					{credit.roomEnding.ttotiList.map((ttoti, index) => (
						<TtotiRelationship key={index}>
							<Participant>
								<ProfileContainer src={ttoti.manitto.memberProfileImageUrl} size="64px" ready={false} />
								<ParticipantName>{ttoti.manitto.memberName}</ParticipantName>
							</Participant>
							<HeartIcon src={HeartArrow} alt="Heart Arrow" />
							<Participant>
								<ProfileContainer src={ttoti.maniti.memberProfileImageUrl} size="64px" ready={false} />
								<ParticipantName>{ttoti.maniti.memberName}</ParticipantName>
							</Participant>
						</TtotiRelationship>
					))}
				</Page>
				<Page>
					<PageTitle>궁예</PageTitle>
					<PageText>최고 정답률 : {credit.roomEnding.bestCorrectScore}</PageText>
					{credit.roomEnding.bestCorrectMemberList.map((member, index) => (
						<Participant key={index} style={{ marginTop: "20px" }}>
							<ProfileContainer src={member.memberProfileImageUrl} size="64px" ready={false} />
							<ParticipantName>{member.memberName}</ParticipantName>
						</Participant>
					))}
				</Page>
				<Page>
					<PageTitle>수다쟁이</PageTitle>
					<PageText>최다 채팅 횟수 : {credit.roomEnding.bestChatCount}</PageText>
					{credit.roomEnding.bestChatMemberList.map((member, index) => (
						<Participant key={index} style={{ marginTop: "20px" }}>
							<ProfileContainer src={member.memberProfileImageUrl} size="64px" ready={false} />
							<ParticipantName>{member.memberName}</ParticipantName>
						</Participant>
					))}
				</Page>
				<Page>
					<PageTitle>&nbsp; 가장 따뜻한 &nbsp; 사람</PageTitle>
					<PageText>최고 온도 점수 : {credit.roomEnding.bestFinalTemperature}</PageText>
					{credit.roomEnding.bestTemperatureMemberList.map((member, index) => (
						<Participant key={index} style={{ marginTop: "20px" }}>
							<ProfileContainer src={member.memberProfileImageUrl} size="64px" ready={false} />
							<ParticipantName>{member.memberName}</ParticipantName>
						</Participant>
					))}
				</Page>
				<Page>
					<PageTitle>내 마니또 퀴즈</PageTitle>
					{credit.manittoQuizList.map((quiz, index) => (
						<QuizContainer key={index}>
							<QuizDateBox>
								<QuizDate>
									{quiz?.quizDate}
								</QuizDate>
							</QuizDateBox>
							<QuizBodyBox>
								{renderQuiz(quiz)}
							</QuizBodyBox>
						</QuizContainer>
					))}
				</Page>
				<Page>
					<PageTitle>내 마니띠 퀴즈</PageTitle>
					{credit.manitiQuizList.map((quiz, index) => (
						<QuizContainer key={index}>
							<QuizDateBox>
								<QuizDate>
									{quiz?.quizDate}
								</QuizDate>
							</QuizDateBox>
							<QuizBodyBox>
								{renderQuiz(quiz)}
							</QuizBodyBox>
						</QuizContainer>
					))}
				</Page>
				{credit.midGuess && <Page>
					<PageTitle>&nbsp;&nbsp; 나의 중간 &nbsp;&nbsp; 마니또 추측</PageTitle>
					<PageText>{credit.midGuess.guessAnswerAt}</PageText>
					<Participant style={{ marginTop: "20px" }}>
						<ProfileContainer src={credit.midGuess.guessMember!.memberProfileImageUrl} size="64px" ready={false} />
						<ParticipantName>{credit.midGuess.guessMember!.memberName}</ParticipantName>
					</Participant>
					{credit.midGuess.guessIsCorrect 
						? <PageText>추측이 맞았습니다 !</PageText>
						: <PageText>추측이 틀렸습니다 !</PageText>
					}
				</Page>}
				<Page>
					<PageTitle>나의 최종 결과</PageTitle>
					<PageText>퀴즈 정답률 : {credit.endingCorrectScore}</PageText>
					<PageText>채팅 횟수 : {credit.endingChatCount}</PageText>
					<PageText>최종 온도 : {credit.endingFinalTemperature}</PageText>
				</Page>
				<Page>
					<PageTitle>Thank You !</PageTitle>
				</Page>
      </CreditContent>
    </CreditOverlay>
  );
};

export default CreditPage;

const CreditOverlay = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 직접 스크롤 방지 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackIcon = styled.img`
	position: fixed;
	top: 30px;
	left: 20px;
	cursor: pointer;
`

const CreditContent = styled.div`
	position: absolute;
	top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 2s ease-in-out;
  padding: 50px 0;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Page = styled.div`
	margin-top: 200px;
  width: 100%;
  height: 100%;
	min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageTitle = styled.h1`
	text-align: center;
	width: 260px;
	font-family: 'GmarketSans';
	font-size: 40px;
	font-weight: normal;
`

const PageText = styled.h3`
	font-family: 'GmarketSans';
	font-size: 20px;
	font-weight: 300;
`

const TtotiRelationship = styled.div`
  margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
`

const Participant = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const ParticipantName = styled.div`
	margin-top: 5px;
	font-family: 'SB어그로';
	font-size: 14px;
	font-weight: 300;
`;

const HeartIcon = styled.img`
  margin-bottom: 30px;
	width: 64px;
	height: 64px;
`;

const QuizContainer = styled.div`
	width: 280px;
	height: 320px;
	border-radius: 12px;
	border: 1px solid black;
	font-family: 'LineSeed';
	background-color: white;
	color: black;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

const QuizDateBox = styled.div`
	margin-top: 20px;
	width: 140px;
	height: 22px;
	border-radius: 15px;
	background-color: #7984fc;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	padding: 5px; /* 패딩 추가 */
`;

const QuizDate = styled.span`
	margin-top: 3px;
	font-size: 16px; /* 폰트 크기 추가 */
	font-weight: bold; /* 볼드 스타일 추가 */
`;

const QuizBodyBox = styled.div`
	margin-top: 16px; /* QuizHeader와의 간격을 설정 */
	flex-grow: 1; /* 공간을 차지하도록 설정 */
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px;
`;

const FourChoiceQuizBody = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`;

const FourChoiceButton = styled.button<{
	$isMatching: boolean;
	$isManitoAnswer: boolean;
	$isManitiAnswer: boolean;
}>`
	width: 240px;
	height: 30px;
	margin-top: 3px;
	border-radius: 10px;
	border: ${({ $isMatching }) =>
		$isMatching ? '2px solid red' : 'none'};
	background-color: ${({
		$isMatching,
		$isManitoAnswer,
		$isManitiAnswer,
	}) =>
		$isMatching
			? '#67C431'
			: $isManitiAnswer
				? '#67C431'
				: $isManitoAnswer
					? '#FF6430'
					: '#E1E9EF'};
`;

const QuizWrapper = styled.div`
	width: 240px;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const TwoChoiceQuizBody = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const TwoChoiceButton = styled(FourChoiceButton)`
	width: 90px;
	height: 90px;
	border: ${({ $isMatching }) =>
		$isMatching ? '2px solid red' : 'none'};
`;

const OXButton = styled(FourChoiceButton)`
	width: 90px;
	height: 90px;
	border: ${({ $isMatching }) =>
		$isMatching ? '2px solid red' : 'none'};
`;

const ResultMessage = styled.div`
	margin-top: 30px;
	font-family: 'LINESeed';
	font-weight: bold;
	font-size: 16px;
	text-align: center;
`;
