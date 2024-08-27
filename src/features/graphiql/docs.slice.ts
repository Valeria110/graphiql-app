import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit/react';
import { IntrospectionQuery } from 'graphql';

interface initialStateInt {
  schema: IntrospectionQuery | null;
}

const initialState: initialStateInt = {
  schema: null,
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setNewSchema(state, action: PayloadAction<IntrospectionQuery>) {
      state.schema = { ...action.payload } as Draft<IntrospectionQuery>;
    },
  },
});

export const { setNewSchema } = docsSlice.actions;
export default docsSlice.reducer;
