import { RESTFulState, HttpMethod, VariableRow, ResponseObj } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RESTFulState = {
  method: 'GET',
  url: 'http://localhost:3001/posts',
  variableTable: [],
  bodyText: '',
  response: undefined,
};

export const RESTFulSlice = createSlice({
  name: 'RESTFul',
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setBodyText: (state, action: PayloadAction<string>) => {
      state.bodyText = action.payload;
    },
    setVariableTable: (state, action: PayloadAction<VariableRow[]>) => {
      state.variableTable = action.payload;
    },
    setResponse: (state, action: PayloadAction<ResponseObj>) => {
      state.response = action.payload;
    },
    resetState: (state) => {
      state.method = initialState.method;
      state.url = initialState.url;
      state.variableTable = initialState.variableTable;
      state.bodyText = initialState.bodyText;
      state.response = initialState.response;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMethod, setUrl, setBodyText, setVariableTable, setResponse, resetState } = RESTFulSlice.actions;

export default RESTFulSlice.reducer;
