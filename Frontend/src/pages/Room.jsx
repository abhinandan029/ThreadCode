import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { yCollab } from 'y-codemirror.next';
import { useRoom } from '../hooks/useRoom.jsx';
import '../styles/Room.css';

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { ydoc, provider } = useRoom(roomId);   // ✅ called here, with the URL's roomId

  const ytext = useMemo(() => {
    if (!ydoc) return null;
    return ydoc.getText('codemirror');
  }, [ydoc]);

  if (!roomId) {
    return (
      <div className="room">
        <button onClick={() => navigate('/home')}>create</button>
      </div>
    );
  }

  if (!ydoc || !provider || !ytext) {
    return <div className="room">Connecting to room...</div>;
  }

  return (
    <div className="room">
      <p>{`Room Id : ${roomId}`}</p>
      <CodeMirror
        id="code-block"
        height="600px"
        width="1000px"
        extensions={[javascript(), yCollab(ytext, provider.awareness)]}
        theme="light"
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default Room;