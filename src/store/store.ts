import { configureStore } from '@reduxjs/toolkit';
import graphiqlEditorReducer from '../features/graphiql/graphiqlEditorSlice';
import RESTFulReducer from '../features/RESTFul/RESTFulSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      graphiqlEditor: graphiqlEditorReducer,
      RESTFul: RESTFulReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
