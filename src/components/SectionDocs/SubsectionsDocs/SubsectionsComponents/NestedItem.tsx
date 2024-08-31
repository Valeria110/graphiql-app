import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react';

interface NestedItemProps {
  name: string;
  description?: string;
  level: number;
  children?: React.ReactNode;
}

export const NestedItem = ({ name, description, level, children }: NestedItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ paddingLeft: `${level * 15}px` }}>
        <ListItemText primary={name} />
        {open ? <ExpandMore /> : <KeyboardArrowRight />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {description && (
          <List component="div" disablePadding>
            <div>
              <ListItemText primary={description} />
            </div>
          </List>
        )}
        {children}
      </Collapse>
    </>
  );
};
