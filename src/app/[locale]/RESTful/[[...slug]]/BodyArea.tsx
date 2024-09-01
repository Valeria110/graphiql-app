import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useState } from 'react';
import prettifyJSON from '@/utils/prettifyJSON';

interface BodyBarAreaProps {
  prettifyCode: () => void;
}

function BodyBarArea({ prettifyCode }: BodyBarAreaProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Body
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" edge="start" color="inherit" aria-label="menu" onClick={prettifyCode}>
              <AutoFixHighIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// TODO: hide minimap for small devices
export default function BodyArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string | undefined) => void;
}) {
  const [editorValue, setEditorValue] = useState(value);

  const prettifyCode = () => {
    const updateCode = prettifyJSON(editorValue);
    setEditorValue(updateCode);
    onChange(updateCode);
  };

  return (
    <Box sx={{ my: 2 }}>
      <BodyBarArea prettifyCode={prettifyCode} />
      <div>
        <Editor
          height="300px"
          width="100%"
          language="json"
          onChange={(newValue) => {
            setEditorValue(newValue ?? '');
            onChange(newValue);
          }}
          value={value}
          options={{
            automaticLayout: true,
            minimap: { enabled: true },
          }}
          theme="vs-dark"
        />
      </div>
    </Box>
  );
}
