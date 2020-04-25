import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';  
import './editorStyle.scss'

function MyEditor() {
  const [editorState, seteditorState] = useState()

  
  return (
    <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={seteditorState}
  placeholder="Ingresar requisitos para el puesto"
/>
  );
}

export default MyEditor
