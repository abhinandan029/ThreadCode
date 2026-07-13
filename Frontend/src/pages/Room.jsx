import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import CodeMirror from '@uiw/react-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {EditorView} from '@codemirror/view'

import { FaSlideshare } from "react-icons/fa6";
import '../styles/Room.css'

function Room({activeRoom}){
  const navigate = useNavigate();


  const [code, setCode] = useState("");

//   const customTheme = EditorView.theme({
//   '&': {
//     backgroundColor: 'hsl(0, 0%, 0%)',   // the outer editor container
//   },
//   '.cm-content': {
//     backgroundColor: 'hsl(0, 0%, 100%)',   // the actual text area background
//   },
//   '.cm-gutters': {
//     backgroundColor: 'hsl(0, 0%, 0%)',   // line-number gutter on the left
//     color: '#ffffff',              // line number text color
//     border: "hsl(0, 0%, 0%)",
//   },
//   '.cm-activeLine': {
//     backgroundColor: 'hsl(0, 0%, 100%)',   // highlight behind the current line
//   },
//   '.cm-activeLineGutter': {
//     backgroundColor: 'hsl(0, 0%, 0%)',   // gutter highlight for current line
//   },
// })
  

  return (
    <div className="room">

      {
        activeRoom.roomId ? 
        <>
          <p>{`Room Id : ${activeRoom.roomId}`}</p>
          <CodeMirror 
          id="code-block"
          value={code}
          height="600px"
          width="1000px"
          extensions = { [javascript()]}
          theme="light"
          onChange={() => setCode(value)}

          basicSetup={{
            lineNumbers: true,
            foldGutter: false,          // collapsible code blocks
            highlightActiveLine: true,  // highlights the line your cursor is on
            highlightActiveLineGutter: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,        // auto-closes ( [ {
            indentOnInput: true,
            tabSize: 2,
          }}

          />
        </>:
        <>
          <button onClick={() => navigate(`/home`)}>create</button>
        </>
        
      }
      
    </div>
  );
}

export default Room