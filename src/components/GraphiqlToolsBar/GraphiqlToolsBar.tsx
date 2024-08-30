import { Button, IconButton } from '@mui/material';
import styles from './GraphiqlToolsBar.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import ToolsBarCodeEditor from './ToolsBarCodeEditor/ToolsBarCodeEditor';

export default function GraphiqlToolsBar() {
  const [isHeadersBtnActive, setIsHeadersBtnActive] = useState(false);
  const [isVariablesBtnActive, setIsVariablesBtnActive] = useState(true);
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const toggleBtn = () => {
    setIsHeadersBtnActive(!isHeadersBtnActive);
    setIsVariablesBtnActive(!isVariablesBtnActive);
    setIsEditorVisible(true);
  };

  const toggleIconBtn = () => {
    setIsEditorVisible(!isEditorVisible);
  };

  return (
    <>
      <div className={styles.toolsContainer}>
        <Button
          onClick={toggleBtn}
          variant="text"
          color="info"
          sx={{
            textTransform: 'capitalize',
            fontSize: '16px',
            color: `${isVariablesBtnActive ? '#fff' : '#ffffff99'}`,
          }}
        >
          Variables
        </Button>
        <Button
          onClick={toggleBtn}
          variant="text"
          color="info"
          sx={{ textTransform: 'capitalize', fontSize: '16px', color: `${isHeadersBtnActive ? '#fff' : '#ffffff99'}` }}
        >
          Headers
        </Button>
        <IconButton onClick={toggleIconBtn} className={styles.iconBtn} aria-label="delete">
          {isEditorVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <div className={styles.EditorContainer}>
        {isEditorVisible ? <ToolsBarCodeEditor isHeadersBtnActive={isHeadersBtnActive} /> : null}
      </div>
    </>
  );
}
