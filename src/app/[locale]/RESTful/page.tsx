'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useId, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod, ResponseCodeTime } from '@/types/types';
import ResponseArea from './ResponseArea';

// TODO: add icon to submit btn

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
        ...(method === 'POST' && { body: JSON.stringify(JSON.parse(body)) }),
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

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  return (
    <Box sx={{ my: 2, px: 1 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id={idLabel}>Method</InputLabel>
            <Select labelId={idLabel} id={idSelect} value={method} label="Method" onChange={handleMethodChange}>
              <MenuItem value={'GET'}>GET</MenuItem>
              <MenuItem value={'POST'}>POST</MenuItem>
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

      {method === 'POST' && <BodyArea value={body} onChange={handleBodyChange} />}

      <ResponseArea response={response} responseInfo={responseInfo} />
    </Box>
  );
}

function BodyArea({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <Box sx={{ my: 2, px: 1 }}>
      <TextField label="Body" multiline rows={4} variant="filled" fullWidth value={value} onChange={onChange} />
    </Box>
  );
}
