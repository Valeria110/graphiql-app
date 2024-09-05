import React, { ReactNode, useState } from 'react';
import { Collapse, Button, Box } from '@mui/material';

function CollapsibleComponent({ children, tabName }: { children: ReactNode; tabName: string }) {
  console.log('CollapsibleComponent');
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setOpen(!open)}>{open ? `Hide ${tabName}` : `Show ${tabName}`}</Button>
      <Collapse in={open}>
        <Box sx={{ p: 2, mt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

export default CollapsibleComponent;
