import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit/react';
import { IntrospectionQuery } from 'graphql';

interface initialStateInt {
  schema: IntrospectionQuery | null;
  isOpen: boolean;
  textError: string;
}

const initialState: initialStateInt = {
  schema: null,
  isOpen: false,
  textError: '',
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setNewSchema(state, action: PayloadAction<IntrospectionQuery>) {
      state.schema = { ...action.payload } as Draft<IntrospectionQuery>;
    },
    setOpenDocs(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.textError = action.payload;
    },
  },
});

export const { setNewSchema, setOpenDocs, setError } = docsSlice.actions;
export default docsSlice.reducer;
