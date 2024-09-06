import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, Box } from '@mui/material';
import { RootState, AppDispatch } from '@/store/store';
import { Action } from '@reduxjs/toolkit';

interface CollapsiblePanelProps {
  children: ReactNode;
  tabName: string;
  tabLength: number;
  stateSelector: (state: RootState) => boolean;
  toggleAction: () => Action;
}

export default function CollapsiblePanel({
  children,
  tabName,
  stateSelector,
  toggleAction,
  tabLength,
}: CollapsiblePanelProps) {
  const dispatch = useDispatch<AppDispatch>();

  const open = useSelector(stateSelector);

  const tabLengthString = `${tabLength > 0 ? `(${tabLength})` : ''}`;

  const setOpen = () => {
    dispatch(toggleAction());
  };

  return (
    <Box>
      <Button onClick={() => setOpen()}>{open ? `Hide ${tabName}` : `Show ${tabName} ${tabLengthString}`}</Button>
      <Collapse in={open}>
        <Box sx={{ p: 2, mt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}
