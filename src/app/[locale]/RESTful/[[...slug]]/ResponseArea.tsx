import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Editor } from '@monaco-editor/react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Loader from '@/components/Loader/Loader';

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
          loading={<Loader />}
        />
      </div>
    </Box>
  );
}

function ResponseAreaBar() {
  const response = useSelector((state: RootState) => state.RESTFul.response);
  const timeMs = response?.timeMs;
  const code = response?.code;
  const t = useTranslations('RESTful.ResponseArea');

  const theme = useTheme();
  const getStatusColor = (code?: number) => {
    if (code === undefined) return theme.palette.text.primary;
    if (code >= 200 && code < 300) return theme.palette.success.main;
    if (code >= 400 && code < 500) return theme.palette.warning.main;
    if (code >= 500) return theme.palette.error.main;
    return theme.palette.text.primary;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" edge="start" color="inherit" aria-label="menu">
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {timeMs ? `${t('Time')}: ${timeMs} ${t('Ms')}` : `${t('Time')}:`}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: getStatusColor(code), fontWeight: 'bold' }}>
            {`${t('Code')}: ${code ?? '\u00A0\u00A0\u00A0'}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
