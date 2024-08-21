import { Box, Button, FormControl, TextField } from '@mui/material';
import { useId } from 'react';

// TODO: Find better way with header

export default function SignUp() {
  const idEmail = useId();
  const idPassword = useId();

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: '50%',
        margin: '0 auto',
        padding: 2,
        marginTop: 20,
      }}
    >
      <FormControl fullWidth error>
        <TextField id={idEmail} label="Email" variant="outlined" required sx={{ marginBottom: 2 }} />
        <TextField
          id={idPassword}
          label="Password"
          variant="outlined"
          type="password"
          required
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
