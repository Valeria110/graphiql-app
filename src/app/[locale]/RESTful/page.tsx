'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useId, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod, ResponseCodeTime } from '@/types/types';
import ResponseArea from './ResponseArea';
import BodyArea from './BodyArea';
import VariablesArea from './VariablesArea';

// TODO: add icon to submit btn
// TODO: add warning for body GET, DELETE, HEAD, OPTIONS
// TODO: maybe loader add later

const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

export default function RESTFul() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [responseInfo, setResponseInfo] = useState<ResponseCodeTime>({ code: undefined, timeMs: undefined });

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
        ...(body && { body }),
      };

      const start = Date.now();
      const res = await fetch(url, options);
      const data = await res.json();
      const finish = Date.now();
      setResponse(JSON.stringify(data, null, 2));
      setResponseInfo({ code: res.status, timeMs: finish - start });
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    setMethod(event.target.value as HttpMethod);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleBodyChange = (newValue: string | undefined) => {
    setBody(newValue || '');
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

      <BodyArea value={body} onChange={handleBodyChange} />
      <VariablesArea />

      <ResponseArea response={response} responseInfo={responseInfo} />
    </Box>
  );
}
