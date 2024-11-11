import styled from 'styled-components';
import { SizeProps } from 'src/types/CircleSize';
import { ReadyProps } from 'src/types/ReadyState';
import readyIcon from '@assets/profiles/readyIcon.png';

const ProfileCircle = styled.div<SizeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ $ready }) => $ready === true ? '#67c431' : 'white' };
  border-radius: 50%;
`

const ProfileImage = styled.img<ReadyProps>`
  width: 92%;
  height: 92%;
  border-radius: 50%;
  filter: brightness(${({ $ready }) => $ready === true ? '50%' : '100%' });
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  /* -user-drag: none; */
`;

const ReadyIcon = styled.img`
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  width: 57%;
  height: 41%;
  /* transform: translate(-50%, -50%); */
`;

export interface ProfileContainerProps {
  src: string;
  size: string;
  ready: boolean;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ src, size, ready }) => {
  return (
    <ProfileCircle size={size} $ready={ready}>
      <ProfileImage src={src} alt='Profile' $ready={ready} />
      {ready && <ReadyIcon src={readyIcon} alt="Ready Icon" />}
    </ProfileCircle>
  );
};

export default ProfileContainer;