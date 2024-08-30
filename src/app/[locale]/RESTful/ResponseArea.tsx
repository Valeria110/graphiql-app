import { Box, TextField, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ResponseCodeTime } from '@/types/types';

export default function ResponseArea({ response, responseInfo }: { response: string; responseInfo: ResponseCodeTime }) {
  return (
    <Box sx={{ my: 2 }}>
      <ResponseAreaBar code={responseInfo.code} timeMs={responseInfo.timeMs} />
      <TextField
        label="Response"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={response}
        InputProps={{ readOnly: true }}
      />
    </Box>
  );
}

function ResponseAreaBar({ code, timeMs }: ResponseCodeTime) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" edge="start" color="inherit" aria-label="menu">
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {`Time: ${timeMs ?? '   '} ms`}
            </Typography>
          </Box>
          <Typography variant="body2">{`Code: ${code ?? ''}`}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
