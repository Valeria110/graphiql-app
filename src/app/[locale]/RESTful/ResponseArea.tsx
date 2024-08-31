import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Editor } from '@monaco-editor/react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function ResponseArea() {
  const response = useSelector((state: RootState) => state.RESTFul.response);

  return (
    <Box sx={{ my: 2 }}>
      <ResponseAreaBar />

      <div>
        <Editor
          height="300px"
          width="100%"
          language="json"
          value={response?.responseText}
          options={{
            readOnly: true,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
          theme="vs-dark"
        />
      </div>
    </Box>
  );
}

function ResponseAreaBar() {
  const response = useSelector((state: RootState) => state.RESTFul.response);
  const timeMs = response?.timeMs;
  const code = response?.code;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" edge="start" color="inherit" aria-label="menu">
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {timeMs ? `Time: ${timeMs} ms` : 'Time: '}
            </Typography>
          </Box>
          <Typography variant="body2">{`Code: ${code ?? '\u00A0\u00A0\u00A0'}`}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
