import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { yCollab } from 'y-codemirror.next';
import { useRoom } from '../hooks/useRoom.jsx';

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
    <div className="flex bg-gray-500 w-full">
      
      <div className="flex flex-col items-center basis-2/3 ml-5">
        <p className="text-white p-3 ">{`Room Id : ${roomId}`}</p>
        <CodeMirror className="flex flex-col p-2"
          id="code-block"
          height="700px"
          width="900px"
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
      
      <div className="flex flex-col bg-white m-15 rounded-lg items-center basis-1/3 ">
          chat
      </div>
    </div>
  );
}

export default Room;