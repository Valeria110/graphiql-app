'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useId } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod } from '@/types/types';
import ResponseArea from './ResponseArea';
import BodyArea from './BodyArea';
import VariablesArea from './VariablesArea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setMethod, setUrl, setResponse, setObj, setUrlAndUpdateURLInner } from '@/features/RESTFul/RESTFulSlice';
import insertVariablesInBody from './insertVariablesInBody';
import { addObjectToLocalStorage, convertSlugToObj, getHttpMethods } from '@/utils/utilsRESTful';
import SendIcon from '@mui/icons-material/Send';
import { useUser } from '@/hooks/authHook';
import LoginRequired from '@/components/LoginRequired/LoginRequired';
import { URLUpdate } from './URLUpdate';

// TODO: add warning for body GET, DELETE, HEAD, OPTIONS
// TODO: loader for code area

const httpMethods: HttpMethod[] = getHttpMethods();

export default function RESTFul({ params }: { params: { slug: string[] } }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useUser();
  const method = useSelector((state: RootState) => state.RESTFul.method);
  const url = useSelector((state: RootState) => state.RESTFul.url);
  const headers = useSelector((state: RootState) => state.RESTFul.headers);
  const bodyText = useSelector((state: RootState) => state.RESTFul.bodyText);
  const variableTable = useSelector((state: RootState) => state.RESTFul.variableTable);
  const obj = useSelector((state: RootState) => state.RESTFul);
  const isInitialized = useSelector((state: RootState) => state.RESTFul.isInitialized);

  const idLabel = useId();
  const idSelect = useId();
  const idURL = useId();

  useEffect(() => {
    if (!isInitialized && params.slug) {
      const newObj = convertSlugToObj(params.slug);
      dispatch(setObj(newObj));
    }
  }, [params.slug, isInitialized, dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const date = new Date().toISOString();

    const updatedObj = {
      ...obj,
      date,
    };

    addObjectToLocalStorage(updatedObj);

    const replacedBody = insertVariablesInBody(variableTable, bodyText);

    try {
      const options: RequestInit = {
        method,
        headers: headers,
        body: replacedBody,
      };

      const start = Date.now();
      const res = await fetch(url, options);
      const finish = Date.now();

      let responseText = '';
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const json = await res.json();
          responseText = JSON.stringify(json, null, 2);
        } catch {
          responseText = '';
        }
      } else {
        try {
          responseText = await res.text();
        } catch {
          responseText = '';
        }
      }

      dispatch(
        setResponse({
          code: res.status,
          timeMs: finish - start,
          responseText: responseText,
        }),
      );
    } catch (error: unknown) {
      const errorMessage = 'An unexpected error occurred';
      const statusCode = 500;

      dispatch(
        setResponse({
          code: statusCode,
          timeMs: 0,
          responseText: errorMessage,
        }),
      );
    }
  };

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    dispatch(setMethod(event.target.value as HttpMethod));
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(event.target.value));
  };

  const handleUrlBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setUrlAndUpdateURLInner(event.target.value));
  };

  if (!user) {
    return <LoginRequired serviceName="REST" />;
  }

  return (
    <URLUpdate>
      <Box sx={{ my: 2, px: 1 }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id={idLabel}>Method</InputLabel>
              <Select labelId={idLabel} id={idSelect} value={method} label="Method" onChange={handleMethodChange}>
                {httpMethods.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id={idURL}
                label="URL"
                variant="outlined"
                fullWidth
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
              />
            </FormControl>

            <Button endIcon={<SendIcon />} variant="contained" type="submit">
              Send
            </Button>
          </Stack>
        </form>

        <BodyArea />
        <VariablesArea />

        <ResponseArea />
      </Box>
    </URLUpdate>
  );
}
