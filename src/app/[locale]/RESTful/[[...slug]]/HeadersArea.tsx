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
import { useState } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import { setHeader } from '@/features/RESTFul/RESTFulSlice';
import CollapsibleComponent from './CollapsibleComponent';

type HeadersArray = [string, string][];

export default function HeadersArea() {
  const dispatch = useDispatch<AppDispatch>();
  const headersTable: HeadersArray = useSelector((state: RootState) => state.RESTFul.headers);

  const [localHeaders, setLocalHeaders] = useState<HeadersArray>(headersTable);

  const handleInputChange = (index: number, field: 'header' | 'value', newValue: string) => {
    const updatedHeaders: HeadersArray = localHeaders.map((row, i) =>
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
      <CollapsibleComponent tabName={`Headers (${localHeaders.length})`}>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '45%' }}>Header</TableCell>
                <TableCell align="left" sx={{ width: '45%' }}>
                  Value
                </TableCell>
                <TableCell align="left" sx={{ width: '10%' }}>
                  Actions
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
                      aria-label="delete"
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
            Add Header
          </Button>
        </Box>
      </CollapsibleComponent>
    </>
  );
}
