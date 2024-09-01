import { RESTFulState, HttpMethod, VariableRow, ResponseObj } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RESTFulState = {
  method: 'GET',
  url: '',
  variableTable: [],
  bodyType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  bodyText: '',
  response: undefined,
};

// TODO: change between JSON and text
export const RESTFulSlice = createSlice({
  name: 'RESTFul',
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    },
    setHeader: (state, action: PayloadAction<HeadersInit | undefined>) => {
      state.headers = action.payload;
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
    setObj: (_, action: PayloadAction<RESTFulState>) => {
      return action.payload;
    },
    setExampleObj: (state) => {
      return {
        ...state,
        method: 'POST',
        url: 'http://localhost:3001/posts',
        variableTable: [
          { variable: 'string', value: '"test string"' },
          { variable: 'number', value: 555 },
        ],
        bodyType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        bodyText: `    {
              "likes": "__number__",
              "title": "new data333",
              "body": "__string__"
          }`,
        response: undefined,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMethod, setUrl, setBodyText, setVariableTable, setResponse, setExampleObj, setObj } =
  RESTFulSlice.actions;

export default RESTFulSlice.reducer;
