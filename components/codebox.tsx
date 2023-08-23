"use client";

import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const CodeBox = ({
  onCodeChange,
  givenCode,
}: {
  onCodeChange?: (newCode: string) => void;
  givenCode: string;
}) => {
  const [code, setCode] = useState(givenCode);
  const [language, setLanguage] = useState("javascript");

  const handleEditorChange = (newValue: string) => {
    if (onCodeChange) {
      onCodeChange(newValue);
    }
    setCode(newValue);
    const detectedLanguage = hljs.highlightAuto(newValue).language;
    if (detectedLanguage) {
      setLanguage(detectedLanguage);
    }
  };

  useEffect(() => {
    // to prevent initial firing
    handleEditorChange(code);
  });

  return (
    <AceEditor
      mode={language}
      theme="vibrant_ink"
      onChange={handleEditorChange}
      height="100vh"
      width="100vw"
      name="codeDiv"
      fontSize={24}
      editorProps={{ $blockScrolling: true }}
      value={code}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export { CodeBox };
