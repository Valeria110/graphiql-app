import React, { ReactNode } from 'react';
import { Collapse, Button, Box } from '@mui/material';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsVariableTableOpen } from '@/features/RESTFul/RESTFulSlice';

export default function CollapsibleComponent({ children, tabName }: { children: ReactNode; tabName: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const open: boolean = useSelector((state: RootState) => state.RESTFul.isVariableTableOpen) ?? false;
  const setOpen = () => {
    dispatch(toggleIsVariableTableOpen());
  };

  return (
    <Box>
      <Button onClick={() => setOpen()}>{open ? `Hide ${tabName}` : `Show ${tabName}`}</Button>
      <Collapse in={open}>
        <Box sx={{ p: 2, mt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}
