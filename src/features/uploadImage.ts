import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

interface InitialState {
  valueImage: File | null;
}

const initialState: InitialState = {
  valueImage: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState: initialState,
  reducers: {
    getValueImage: (state, action) => {
      state.valueImage = action.payload;
    },
  },
});

export const { getValueImage } = uploadSlice.actions;

export const selectValueImage = (state: RootState) => state.upload.valueImage;

export default uploadSlice.reducer;
