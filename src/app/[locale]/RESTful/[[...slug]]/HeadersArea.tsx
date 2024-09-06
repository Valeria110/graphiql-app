import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import { setHeader, toggleIsHeaderTableOpen } from '@/features/RESTFul/RESTFulSlice';
import CollapsiblePanel from '@/components/CollapsiblePanel/CollapsiblePanel';
import { useTranslations } from 'next-intl';
import { HeadersREST } from '@/types/types';

export default function HeadersArea() {
  const dispatch = useDispatch<AppDispatch>();
  const headersFromRedux: HeadersREST = useSelector((state: RootState) => state.RESTFul.headers);
  const t = useTranslations('RESTful.HeadersArea');

  const [localHeaders, setLocalHeaders] = useState<HeadersREST>(headersFromRedux);

  useEffect(() => {
    setLocalHeaders(headersFromRedux); // syns
  }, [headersFromRedux]);

  const handleInputChange = (index: number, field: 'header' | 'value', newValue: string) => {
    const updatedHeaders: HeadersREST = localHeaders.map((row, i) =>
      i === index ? [field === 'header' ? newValue : row[0], field === 'value' ? newValue : row[1]] : row,
    );
    setLocalHeaders(updatedHeaders);
  };

  const handleBlur = () => {
    dispatch(setHeader(localHeaders));
  };

  const handleAddRow = () => {
    const newRow: [string, string] = ['', ''];
    const updatedHeaders = [...localHeaders, newRow];
    setLocalHeaders(updatedHeaders);
    dispatch(setHeader(updatedHeaders));
  };

  const handleRemoveRow = (index: number) => {
    const updatedHeaders = localHeaders.filter((_, i) => i !== index);
    setLocalHeaders(updatedHeaders);
    dispatch(setHeader(updatedHeaders));
  };

  return (
    <>
      <CollapsiblePanel
        tabName={t('TabName')}
        stateSelector={(state) => state.RESTFul.isHeaderTableOpen ?? false}
        toggleAction={toggleIsHeaderTableOpen}
        tabLength={localHeaders.length}
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '45%' }}>{t('RowHeader')}</TableCell>
                <TableCell align="left" sx={{ width: '45%' }}>
                  {t('RowValue')}
                </TableCell>
                <TableCell align="left" sx={{ width: '10%' }}>
                  {t('RowActions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localHeaders.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ width: '45%' }}>
                    <TextField
                      value={row[0]}
                      onChange={(e) => handleInputChange(index, 'header', e.target.value)}
                      onBlur={handleBlur}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '45%' }}>
                    <TextField
                      value={row[1]}
                      onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                      onBlur={handleBlur}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '10%' }}>
                    <IconButton
                      size="small"
                      edge="start"
                      color="inherit"
                      aria-label={t('DeleteLabelBtn')}
                      onClick={() => handleRemoveRow(index)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddRow}>
            {t('AddHeaderBtn')}
          </Button>
        </Box>
      </CollapsiblePanel>
    </>
  );
}
