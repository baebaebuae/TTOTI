export interface RoomInfo {
  roomHostMemberName: string;
  roomName: string;
  ttotiMatchInfo: {
    myTtotiId: number;
    myTittoId: number;
    myManittoAnimalName: string;
    myManittoAnimalImageUrl: string;
    myName: string;
    myProfileImageUrl: string;
    myAnimalName: string;
    myAnimalImageUrl: string;
    myManitiMemberName: string;
    myManitiProfileImageUrl: string;
  };
  canGuess: boolean,
  guessInfoDto: null | {
    myManitto: {
      manittoProfileImageUrl: string;
      manittoNickname: string;
    };
    roomMemberList: {
      roomMemberProfileImageUrl: string;
      roomMemberName: string;
      roomMemberId: number;
    }[];
  };
}