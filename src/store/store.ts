import { configureStore } from '@reduxjs/toolkit';
import graphiqlEditorReducer from '../features/graphiql/graphiqlEditorSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      graphiqlEditor: graphiqlEditorReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
