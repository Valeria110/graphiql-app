import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
  query: string;
  headers: Record<string, string> | null;
  variables: string | null;
  response: string;
  urlEndpoint: string;
}

const initialState: InitialState = {
    query: `query {
  character(id: 1) {
    id
    name
    status
  }
}`,
headers: null,
variables: null,
response: '',
urlEndpoint: 'https://rickandmortyapi.com/graphql'
}

const graphiqlEditorSLice = createSlice({
  name: 'graphiqlEditor',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    setHeaders(state, action: PayloadAction<typeof initialState['headers']>) {
      state.headers = action.payload
    },
    setVariables(state, action: PayloadAction<typeof initialState['variables']>) {
      state.variables = action.payload
    },
    setResponse(state, action: PayloadAction<typeof initialState['response']>) {
      state.response = action.payload
    },
    setUrlEndpoint(state, action: PayloadAction<typeof initialState['urlEndpoint']>) {
      state.urlEndpoint = action.payload
    },
  }
})

export const {setQuery, setHeaders, setVariables, setResponse, setUrlEndpoint} = graphiqlEditorSLice.actions;
export default graphiqlEditorSLice.reducer;