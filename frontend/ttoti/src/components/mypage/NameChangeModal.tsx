import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberName, toggleModal, selectMemberName } from '../../stores/slices/userSlice';
import { changeName } from '@services/apiMyPage';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);  /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  /* 모달이 다른 콘텐츠 위에 오도록 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px 30px;
  border-radius: 8px;  /* 둥근 모서리 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);  /* 그림자 효과 */
  width: 400px;  /* 모달의 너비 */
  max-width: 90%;  /* 화면 크기 대비 최대 90% */
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;  /* 포커스 시 파란색 테두리 */
    }
  }

  /* 버튼들이 가로로 나열되도록 설정 */
  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 48%;  /* 버튼 너비를 48%로 설정하여 두 버튼이 나란히 배치되도록 함 */
  }

  .confirm-button {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;  /* 버튼에 마우스를 올렸을 때 색 변화 */
    }

    &:active {
      background-color: #004085;  /* 버튼 클릭 시 색 변화 */
    }
  }

  .cancel-button {
    background-color: #dc3545;  /* 빨간색 배경 */
    color: white;

    &:hover {
      background-color: #c82333;  /* 취소 버튼에 마우스를 올렸을 때 색 변화 */
    }

    &:active {
      background-color: #bd2130;  /* 취소 버튼 클릭 시 색 변화 */
    }
  }
`;

const NameChangeModal = () => {
  const dispatch = useDispatch();
  const currentName = useSelector(selectMemberName);
  const [newName, setNewName] = useState(currentName);

  const handleConfirm = async () => {
    try {
      await changeName(newName);
      dispatch(setMemberName(newName));
      dispatch(toggleModal());
    } catch (error) {
      console.error('Failed to change name:', error);
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal());  // 취소 시 모달 닫기
  };

  return (
    <ModalOverlay onClick={() => dispatch(toggleModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>이름 변경</h3>
        <input 
          type="text" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
        />
        <div className="button-container">
          <button className="confirm-button" onClick={handleConfirm}>확인</button>
          <button className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NameChangeModal;
