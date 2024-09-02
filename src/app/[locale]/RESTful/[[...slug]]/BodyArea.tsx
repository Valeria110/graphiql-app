import { AppBar, Box, Toolbar, Typography, IconButton, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { setBodyText, setBodyType } from '@/features/RESTFul/RESTFulSlice';
import { useCallback, useEffect, useId, useState } from 'react';
import { BodyType } from '@/types/types';
import { prettifyJSON, prettifyText } from '@/utils/prettifyBody';

interface BodyBarAreaProps {
  prettifyCode: () => void;
}

function BodyBarArea({ prettifyCode }: BodyBarAreaProps) {
  const idLabel = useId();
  const idSelect = useId();
  const dispatch = useDispatch<AppDispatch>();
  const bodyType = useSelector((state: RootState) => state.RESTFul.bodyType);

  const bodyTypes: BodyType[] = ['json', 'text'];

  const handleMethodChange = (event: SelectChangeEvent<BodyType>) => {
    dispatch(setBodyType(event.target.value as BodyType));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Select labelId={idLabel} id={idSelect} value={bodyType} label="Method" onChange={handleMethodChange}>
            {bodyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2" sx={{ m: 1 }}>
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
  const bodyType = useSelector((state: RootState) => state.RESTFul.bodyType);

  const [editorValue, setEditorValue] = useState(bodyTextFromRedux);

  useEffect(() => {
    setEditorValue(bodyTextFromRedux); // syns
  }, [bodyTextFromRedux]);

  const prettifyCode = useCallback(() => {
    let updateCode = editorValue;
    if (bodyType === 'text') {
      updateCode = prettifyText(editorValue);
    } else if (bodyType === 'json') {
      updateCode = prettifyJSON(editorValue);
    }
    setEditorValue(updateCode);
    dispatch(setBodyText(updateCode));
  }, [editorValue, bodyType, dispatch]);

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
          language={bodyType}
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
