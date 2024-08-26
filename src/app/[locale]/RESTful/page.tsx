'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useId } from 'react';

export default function RESTFul() {
  const methods: 'GET' | 'POST' = 'GET'; // TODO: ...
  const idLabel = useId();
  const idSelect = useId();
  const idURL = useId();

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleChange = () => {
    console.log('change method');
  };

  return (
    <Box sx={{ my: 2, px: 1 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id={idLabel}>Method</InputLabel>
            <Select labelId={idLabel} id={idSelect} value={methods} label="Method" onChange={handleChange}>
              <MenuItem value={'GET'}>GET</MenuItem>
              <MenuItem value={'POST'}>POST</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField id={idURL} label="URL" variant="outlined" fullWidth />
          </FormControl>

          <Button variant="contained" type="submit">
            Send
          </Button>
        </Stack>
      </form>
      <BodyArea value={'text'} />
    </Box>
  );
}

function BodyArea({ value }: { value: string }) {
  // TODO: replace later with prettier
  return (
    <Box sx={{ my: 2, px: 1 }}>
      <TextField label="Body" multiline rows={4} variant="filled" fullWidth value={value} />
    </Box>
  );
}
