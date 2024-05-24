
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginUser: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { addUser } = counterSlice.actions;
export default counterSlice.reducer;
