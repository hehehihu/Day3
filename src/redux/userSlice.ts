import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Định nghĩa type cho user
export interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
  gender: string;
}

// 2. Kiểu tổng hợp: user có thể null
type UserSliceState = UserState | null;

// 3. Khai báo initialState
const initialState: UserSliceState = null;

// 4. Tạo slice với reducer trả về kiểu đúng
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>): UserSliceState => action.payload,
    clearUser: (): UserSliceState => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
