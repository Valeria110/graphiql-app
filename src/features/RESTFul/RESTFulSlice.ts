import { RESTFulState, HttpMethod, VariableRow, ResponseObj, BodyType } from '@/types/types';
import { functionConvertObjToShortURL } from '@/utils/utilsRESTful';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: RESTFulState = {
  method: 'GET',
  url: '',
  variableTable: [],
  bodyType: 'json',
  headers: [],
  bodyText: '',
  urlInner: 'GET',
  response: undefined,
  isInitialized: false,
  date: '',
};

export const RESTFulSlice = createSlice({
  name: 'RESTFul',
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    setHeader: (state, action: PayloadAction<[string, string][]>) => {
      state.headers = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setUrlAndUpdateURLInner: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    setBodyText: (state, action: PayloadAction<string>) => {
      state.bodyText = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    setVariableTable: (state, action: PayloadAction<VariableRow[]>) => {
      state.variableTable = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    setResponse: (state, action: PayloadAction<ResponseObj>) => {
      state.response = action.payload;
    },
    setBodyType: (state, action: PayloadAction<BodyType>) => {
      state.bodyType = action.payload;
      RESTFulSlice.caseReducers.updateURLInner(state);
    },
    updateURLInner: (state) => {
      state.urlInner = functionConvertObjToShortURL(state);
    },
    setObj: (_, action: PayloadAction<RESTFulState>) => {
      return action.payload;
    },
    restoreAllFieldsRest: (state, action: PayloadAction<RESTFulState>) => {
      return { ...state, ...action.payload };
    },
    toggleIsVariableTableOpen: (state) => {
      const prev = state.isVariableTableOpen ?? false;
      state.isVariableTableOpen = !prev;
    },
    toggleIsHeaderTableOpen: (state) => {
      const prev = state.isHeaderTableOpen ?? false;
      state.isHeaderTableOpen = !prev;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMethod,
  setUrl,
  setBodyText,
  setVariableTable,
  setResponse,
  setObj,
  setBodyType,
  setUrlAndUpdateURLInner,
  restoreAllFieldsRest,
  updateURLInner,
  toggleIsVariableTableOpen,
  toggleIsHeaderTableOpen,
  setHeader,
} = RESTFulSlice.actions;

export default RESTFulSlice.reducer;
