// import React, { useState,Component } from 'react';
// import {  EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
// // import 'draft-js/dist/Draft.css';
// import { FC } from "react";
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import React, { useEffect, useState } from 'react';
import { EditorState ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FC } from "react";
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';


interface MyRichTextEditorProps {

  draft : string
  editorState: any;
  setEditorState : React.Dispatch<React.SetStateAction<any>>;
}

const TextEditor: FC<MyRichTextEditorProps> = (props) => { 
  const { draft ,editorState , setEditorState} = props;
  const contentBlock = htmlToDraft(draft);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  // const [editorState, setEditorState] = useState(
  //   () => EditorState.createWithContent(contentState),
  // );

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
}

export default TextEditor;
