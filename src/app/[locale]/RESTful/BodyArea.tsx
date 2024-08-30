import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Editor } from '@monaco-editor/react';

function BodyBarArea() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">Body</Typography>
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
  return (
    <Box sx={{ my: 2, px: 1 }}>
      <BodyBarArea />
      <div>
        <Editor
          height="300px"
          width="100%"
          language="json"
          onChange={onChange}
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
