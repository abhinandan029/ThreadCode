import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState} from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { EditorView} from "@codemirror/view"

import { javascript } from '@codemirror/lang-javascript';
import { yCollab } from 'y-codemirror.next';

import { useRoom } from '../hooks/useRoom.jsx';

function Room() {
  
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [joinInput, setJoinInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleJoin(e){
    e.preventDefault();
    setErrMsg("");
    setStatus("joining");

    try{
      const res = await fetch(`/api/room/${joinInput}/access`, {
        credentials : 'include',
      });

      const data = await res.json();

      if (!res.ok){
        throw new Error(data.error || `Server responded with ${res.status}`);
      }

      navigate(`/room/${joinInput}`);
    }
    catch(error){
      setStatus("error");
      setErrMsg(error.message);
    }
  }  
  const { ydoc, provider } = useRoom(roomId);

  const ytext = useMemo(() => {
    if (!ydoc) return null;
    return ydoc.getText('codemirror');
  }, [ydoc]);

  // if (!ydoc || !provider || !ytext) {
  //   return <div className="room">Connecting to room...</div>;
  // }

  const fixedHeightEditor = EditorView.theme({
  ".cm-scroller": {overflow: "auto"}
})

  if(!roomId){
    return (
      <div className="bg-linear-to-b from-secondary-bg to-amber-900 from-30% flex flex-1 flex-col items-center">

        <form className="flex flex-col items-center mt-40" onSubmit={handleJoin}>

          <p className="text-amber-700 text-[50px] font-medium mb-8">Invited to a Room by your Friend ?</p>
          <p className="text-secondary-text text-[25px] mb-3">Paste the code here to join the room</p>
          <p className="text-[22px] mb-5">⬇️</p>
          
          <input 
          className="px-2 bg-black/20 text-[24px] text-white text-center py-1 rounded-lg border border-amber-900 outline-none"
          type="text"
          placeholder="Paste the room ID here"
          value={joinInput}
          onChange={(e) => setJoinInput(e.target.value)}
          required>
          </input>

          {status === "error" && <P className="text-red-400 text-sm">{errMsg}</P>}

          <input
          type="submit"
          value={status === "joining" ? "Joining...." : "Join Room"}
          className="bg-amber-600 m-10 px-3 text-[26px] rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer"
          disabled={status === "Joining"}
          ></input>

        </form>

      </div>
    );
  } 
  
  return(
    <div className="flex bg-linear-to-b from-secondary-bg to-amber-900 from-30% w-full h-full">

      <div className="basis-2/3 m-2 bg-black/50 rounded-md">
        
        <div className="flex items-center justify-between px-2 w-full h-1/20 bg-black overflow-hidden rounded-t-md ">
          <p className="text-amber-700 font-medium">{"</>"} Code Editor</p>
          
        </div>

        <div className="h-19/20 w-full rounded-b-md">
        <CodeMirror
          id="code-block"
          extensions={[javascript()]}
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
      </div>

      <div className="flex flex-col basis-1/3 m-1">
          
        <div className=" flex flex-col basis-2/3 m-1 bg-black/60 rounded-md">
         
          <div className="flex items-center justify-between px-2 w-full h-1/10 bg-black overflow-hidden rounded-t-md">
            <p className="text-amber-700 font-medium">Room Chat</p>
            <div className="p-2 bg-white/40 rounded-md">members</div>
          </div>

        </div>

        <div className="basis-1/3 m-1 bg-black/50 rounded-md font-mono">
          
          <div className="flex items-center justify-between px-2 w-full h-1/6 bg-black overflow-hidden rounded-t-md">
            <p className="text-amber-700 font-medium">OUTPUT</p>
          </div>
          
          <p className="w-full h-5/6 py-2 text-green-400 rounded-b-md">
            <p className="inline-block px-2">{">"}</p>Hello World!!
          </p>
        </div>

      </div>

    </div>
  );
}

export default Room;

