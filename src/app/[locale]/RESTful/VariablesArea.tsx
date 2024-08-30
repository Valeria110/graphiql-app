import { useState } from 'react';
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

interface VariableRow {
  variable: string;
  value: string;
}

const initialRows: VariableRow[] = [
  { variable: 'base_url', value: 'https://api.example.com' },
  { variable: 'token', value: '1234567890' },
  { variable: 'timeout', value: '5000' },
];

export default function VariablesArea() {
  const [rows, setRows] = useState<VariableRow[]>(initialRows);

  const handleValueChange = (index: number, newValue: string) => {
    const updatedRows = [...rows];
    updatedRows[index].value = newValue;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow: VariableRow = { variable: '', value: '' };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '35%' }}>Variable</TableCell>
              <TableCell align="left" sx={{ width: '60%' }}>
                Value
              </TableCell>
              <TableCell align="left" sx={{ width: '5%' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                  <TextField
                    value={row.variable}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].variable = e.target.value;
                      setRows(updatedRows);
                    }}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="left" sx={{ width: '60%' }}>
                  <TextField
                    value={row.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="left" sx={{ width: '5%' }}>
                  <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
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
          Add Row
        </Button>
      </Box>
    </>
  );
}
