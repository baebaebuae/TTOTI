import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import fetchUserInfo from '@hooks/fetchUserInfo';

interface UserState {
  memberId: string;
  memberName: string;
  memberProfileImageUrl: string;
  isModalOpen: boolean; // 모달 상태 추가
}

const initialState: UserState = {
  memberId: '',
  memberName: '',
  memberProfileImageUrl: '',
  isModalOpen: false, // 초기 모달 상태 추가
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: PayloadAction<{
        memberId: string;
        memberName: string;
        memberProfileImageUrl: string;
      }>,
    ) {
      state.memberId = action.payload.memberId;
      state.memberName = action.payload.memberName;
      state.memberProfileImageUrl = action.payload.memberProfileImageUrl;
    },
    setMemberName(state, action: PayloadAction<string>) {
      state.memberName = action.payload; // 사용자 이름 변경
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen; // 모달 상태 토글
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.memberId = action.payload.memberId;
        state.memberName = action.payload.memberName;
        state.memberProfileImageUrl = action.payload.memberProfileImageUrl;
      }
    });
  },
});

export const { setUserInfo, setMemberName, toggleModal } = userSlice.actions;
export default userSlice.reducer;

// store 조회
export const selectMemberName = (state: RootState) => state.user.memberName;
export const selectMemberId = (state: RootState) => state.user.memberId;
export const selectMemberProfile = (state: RootState) => state.user.memberProfileImageUrl;
export const selectIsModalOpen = (state: RootState) => state.user.isModalOpen; // 모달 상태 선택자 추가
