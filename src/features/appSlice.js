import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaceId: null,
  roomId: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterWorkspace: (state, action) => {
      state.workspaceId = action.payload;
    },
    enterRoom: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { enterRoom, enterWorkspace } = appSlice.actions;

export const selectWorkspaceId = (state) => state.app.workspaceId;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
