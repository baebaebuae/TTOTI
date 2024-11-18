import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// 다른 슬라이스 추가 가능

const rootReducer = combineReducers({
  user: userReducer,
  // 다른 슬라이스 추가 가능
});

export default rootReducer;
