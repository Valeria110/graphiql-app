'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useId } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod } from '@/types/types';
import ResponseArea from './ResponseArea';
import BodyArea from './BodyArea';
import VariablesArea from './VariablesArea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setBodyText, setMethod, setUrl, setResponse } from '@/features/RESTFul/RESTFulSlice';

// TODO: add icon to submit btn
// TODO: add warning for body GET, DELETE, HEAD, OPTIONS
// TODO: maybe loader add later

const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

export default function RESTFul() {
  const dispatch = useDispatch<AppDispatch>();
  const method = useSelector((state: RootState) => state.RESTFul.method);
  const url = useSelector((state: RootState) => state.RESTFul.url);
  const bodyText = useSelector((state: RootState) => state.RESTFul.bodyText);

  const idLabel = useId();
  const idSelect = useId();
  const idURL = useId();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(bodyText && { body: bodyText }),
      };

      const start = Date.now();
      const res = await fetch(url, options);
      const data = await res.json();
      const finish = Date.now();

      dispatch(
        setResponse({
          code: res.status,
          timeMs: finish - start,
          responseText: JSON.stringify(data, null, 2),
        }),
      );
    } catch (error) {
      // setResponse(`Error: ${error}`);
      console.error(error);
    }
  };

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    setMethod(event.target.value as HttpMethod);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleBodyChange = (newValue: string | undefined) => {
    setBodyText(newValue || '');
  };

  return (
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
            <TextField id={idURL} label="URL" variant="outlined" fullWidth value={url} onChange={handleUrlChange} />
          </FormControl>

          <Button variant="contained" type="submit">
            Send
          </Button>
        </Stack>
      </form>

      <BodyArea value={bodyText} onChange={handleBodyChange} />
      <VariablesArea />

      <ResponseArea />
    </Box>
  );
}
