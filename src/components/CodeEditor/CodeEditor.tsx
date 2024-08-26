'use client';

import styles from './CodeEditor.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { FocusEvent, useEffect, useState } from 'react';
import EditorButtons from './EditorButtons/EditorButtons';
import { CodeEditorLanguage, PagesRoutes } from '@/types/types';
import { Editor } from '@monaco-editor/react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { setQuery } from '@/features/graphiql/graphiqlEditorSlice';
import { formatToBase64 } from '@/utils/utils';

interface CodeEditorProps {
  language: CodeEditorLanguage;
}

export default function CodeEditor({ language }: CodeEditorProps) {
  const { query: editorCodeQueryValue, urlEndpoint } = useAppSelector((state) => state.graphiqlEditor);
  const pathUrl = usePathname();
  const localActive = useLocale();
  const dispatch = useAppDispatch();
  const [query, setEditorQuery] = useState(editorCodeQueryValue);
  const [pathname, setPathname] = useState(pathUrl);

  useEffect(() => {
    if (query) {
      setEditorQuery(editorCodeQueryValue);
    }

    window.history.replaceState(null, '', pathname);
  }, [editorCodeQueryValue, setEditorQuery, pathname, query]);

  const handleChange = (value: string | undefined) => {
    setEditorQuery(value ?? '');
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const queryBase64 = formatToBase64(inputValue);
    const urlEndpointBase64 = formatToBase64(urlEndpoint);
    const newPath = `/${localActive}/${PagesRoutes.Graphql}/${urlEndpointBase64}/${queryBase64}`;
    setPathname(newPath);
    dispatch(setQuery(inputValue));
  };

  return (
    <div className={styles.codeEditor}>
      <div className={styles.monacoEditor} onBlur={handleOnBlur}>
        <Editor
          height="400px"
          width="100%"
          defaultValue={query}
          defaultLanguage={language}
          value={query}
          onChange={handleChange}
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
      <EditorButtons setQuery={setEditorQuery} query={query} />
    </div>
  );
}
