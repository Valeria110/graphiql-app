import { GraphqlRequest, RESTFulState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';

interface initialStateInt {
  currentRequest: null | GraphqlRequest | RESTFulState;
}

const initialState: initialStateInt = {
  currentRequest: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCurrentRequest(state, action: PayloadAction<GraphqlRequest | RESTFulState>) {
      state.currentRequest = action.payload;
    },
  },
});

export const { setCurrentRequest } = historySlice.actions;
export default historySlice.reducer;
