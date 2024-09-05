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
import { RootState, AppDispatch } from '@/store/store';
import { setVariableTable } from '@/features/RESTFul/RESTFulSlice';
import CollapsibleComponent from '@/components/CollapsibleComponent/CollapsibleComponent';

// TODO: Collapse if change row
export default function VariablesArea() {
  const dispatch = useDispatch<AppDispatch>();
  const varTable = useSelector((state: RootState) => state.RESTFul.variableTable);

  const handleValueChange = (index: number, field: 'variable' | 'value', newValue: string) => {
    const updatedRows = varTable.map((row, i) => (i === index ? { ...row, [field]: newValue } : row));
    dispatch(setVariableTable(updatedRows));
  };

  const handleAddRow = () => {
    const newRow = { variable: `var${varTable.length + 1}`, value: '' };
    dispatch(setVariableTable([...varTable, newRow]));
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = varTable.filter((_, i) => i !== index);
    dispatch(setVariableTable(updatedRows));
  };

  return (
    <>
      <CollapsibleComponent tabName={`Variables ${varTable.length > 0 ? `(${varTable.length})` : ''}`}>
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
              {varTable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                    <TextField
                      value={row.variable}
                      onChange={(e) => handleValueChange(index, 'variable', e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '60%' }}>
                    <TextField
                      value={row.value}
                      onChange={(e) => handleValueChange(index, 'value', e.target.value)}
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
      </CollapsibleComponent>
    </>
  );
}
