import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import prettifyJSON from '@/utils/prettifyJSON';
import { setBodyText } from '@/features/RESTFul/RESTFulSlice';
import { useCallback, useState } from 'react';

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
export default function BodyArea() {
  const dispatch = useDispatch<AppDispatch>();
  const bodyTextFromRedux = useSelector((state: RootState) => state.RESTFul.bodyText);
  const [editorValue, setEditorValue] = useState(bodyTextFromRedux);

  const prettifyCode = useCallback(() => {
    const updateCode = prettifyJSON(editorValue);
    setEditorValue(updateCode);
    dispatch(setBodyText(updateCode));
  }, [editorValue, dispatch]);

  const handleBlur = useCallback(() => {
    if (editorValue !== bodyTextFromRedux) {
      dispatch(setBodyText(editorValue));
    }
  }, [editorValue, bodyTextFromRedux, dispatch]);

  return (
    <Box sx={{ my: 2 }}>
      <BodyBarArea prettifyCode={prettifyCode} />
      <Box sx={{ height: '300px', width: '100%' }} tabIndex={0} onBlur={handleBlur}>
        <Editor
          height="100%"
          width="100%"
          language="json"
          value={editorValue}
          onChange={(newValue) => {
            setEditorValue(newValue ?? '');
          }}
          options={{
            automaticLayout: true,
            minimap: { enabled: true },
          }}
          theme="vs-dark"
        />
      </Box>
    </Box>
  );
}
