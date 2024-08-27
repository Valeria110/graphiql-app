import { configureStore } from '@reduxjs/toolkit';
import graphiqlEditorReducer from '../features/graphiql/graphiqlEditorSlice';
import docsSlice from '@/features/graphiql/docs.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      graphiqlEditor: graphiqlEditorReducer,
      docs: docsSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
