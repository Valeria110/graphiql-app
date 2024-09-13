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
import { setVariableTable, toggleIsVariableTableOpen } from '@/features/RESTFul/RESTFulSlice';
import CollapsiblePanel from '@/components/CollapsiblePanel/CollapsiblePanel';
import { useTranslations } from 'next-intl';

export default function VariablesArea() {
  const dispatch = useDispatch<AppDispatch>();
  const tableFromRedux = useSelector((state: RootState) => state.RESTFul.variableTable);
  const t = useTranslations('RESTful.VariablesArea');

  const [localTable, setLocalTable] = useState(tableFromRedux);

  useEffect(() => {
    setLocalTable(tableFromRedux); // syns
  }, [tableFromRedux]);

  const handleInputChange = (index: number, field: 'variable' | 'value', newValue: string) => {
    const updatedRows = localTable.map((row, i) => (i === index ? { ...row, [field]: newValue } : row));
    setLocalTable(updatedRows);
  };

  const handleBlur = (index: number, field: 'variable' | 'value', newValue: string) => {
    const updatedRows = tableFromRedux.map((row, i) => (i === index ? { ...row, [field]: newValue } : row));
    dispatch(setVariableTable(updatedRows));
  };

  const handleAddRow = () => {
    const newRow = { variable: `var${localTable.length + 1}`, value: '' };
    setLocalTable([...localTable, newRow]);
    dispatch(setVariableTable([...localTable, newRow]));
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = localTable.filter((_, i) => i !== index);
    setLocalTable(updatedRows);
    dispatch(setVariableTable(updatedRows));
  };

  return (
    <>
      <CollapsiblePanel
        tabName={t('TabName')}
        stateSelector={(state) => state.RESTFul.isVariableTableOpen ?? false}
        toggleAction={toggleIsVariableTableOpen}
        tabLength={localTable.length}
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '35%' }}>{t('RowVariable')}</TableCell>
                <TableCell align="left" sx={{ width: '60%' }}>
                  {t('RowValue')}
                </TableCell>
                <TableCell align="left" sx={{ width: '5%' }}>
                  {t('RowActions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localTable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                    <TextField
                      value={row.variable}
                      onChange={(e) => handleInputChange(index, 'variable', e.target.value)}
                      onBlur={(e) => handleBlur(index, 'variable', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="header"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '60%' }}>
                    <TextField
                      value={row.value}
                      onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                      onBlur={(e) => handleBlur(index, 'value', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="value"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '5%' }}>
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
            {t('AddRowBtn')}
          </Button>
        </Box>
      </CollapsiblePanel>
    </>
  );
}
