import { Editor } from '@monaco-editor/react';
import styles from './ToolsBarCodeEditor.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { setHeaders, setVariables } from '@/features/graphiql/graphiqlEditorSlice';
import { usePathname } from 'next/navigation';

interface EditorProps {
  isHeadersBtnActive: boolean;
}

export default function ToolsBarCodeEditor({ isHeadersBtnActive }: EditorProps) {
  const dispatch = useAppDispatch();
  const headers = useAppSelector((state) => state.graphiqlEditor.headers) ?? '';
  const variables = useAppSelector((state) => state.graphiqlEditor.variables) ?? '';
  const pathname = usePathname();

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (isHeadersBtnActive) {
      if (!inputValue || inputValue === '{}') {
        dispatch(setHeaders(null));
      } else {
        try {
          const headersObj = JSON.parse(inputValue);
          dispatch(setHeaders(headersObj));
          createQueryString(headersObj);
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error('Syntax error: ', e.message);
          }
        }
      }
    } else {
      dispatch(setVariables(inputValue));
    }
  };

  const createQueryString = (headersObj: Record<string, string>) => {
    const headersArr = Object.entries(headersObj);
    const queryStr = '?' + headersArr.map((item) => `${item[0]}=${item[1]}`).join('&');
    const newPathname = pathname + queryStr;
    window.history.replaceState(null, '', newPathname);
  };

  return (
    <div className={styles.editorContainer} onBlur={handleOnBlur} data-testid="editor-container">
      <Editor
        height="138px"
        width="100%"
        language="json"
        value={isHeadersBtnActive ? (headers ? JSON.stringify(headers, null, 2) : '') : variables}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          fontSize: 16,
          fontFamily: 'Poppins',
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          formatOnPaste: true,
        }}
      />
    </div>
  );
}
