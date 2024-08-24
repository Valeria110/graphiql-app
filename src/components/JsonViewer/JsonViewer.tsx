'use client'

import styles from './JsonViewer.module.scss'
import { useAppSelector } from "@/hooks/storeHooks";
import { Editor } from "@monaco-editor/react";

export default function JsonViewer() {
    const response = useAppSelector(state => state.graphiqlEditor.response);

    return <div className={styles.jsonViewer}>
      <Editor
      height="400px"  width="100%"
      language="json"
      value={response ? response : ''} 
      options={{
        readOnly: true, 
        automaticLayout: true,
        minimap: { enabled: false }, 
      }}
      theme="vs-dark"
    />
    </div>
}