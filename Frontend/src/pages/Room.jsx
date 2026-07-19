import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view"

import { javascript } from '@codemirror/lang-javascript';
import { yCollab } from 'y-codemirror.next';

import { FaRegCopy } from "react-icons/fa6";

import { useRoom } from '../hooks/useRoom.jsx';
import { useAuth } from '../context/authContext';

import { runCode } from '../utils/runJs.jsx';

import { API_URL } from '../config.js';

function Room() {

  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [joinInput, setJoinInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [onlineEmails, setOnlineEmails] = useState(new Set());

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState("idle");
  const [inviteErr, setInviteErr] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [systemEvents, setSystemEvents] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  const [copied, setCopied] = useState(false);

  const prevOnlineRef = useRef(new Set());
  const isFirstPresenceRun = useRef(true);
  const debounceTimerRef = useRef(null);

  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);

  function handleRun() {
    setRunning(true);
    const code = ytext.toString(); // pull current editor content directly from the CRDT text
    const logs = runCode(code);
    setOutput(logs);
    setRunning(false);
  }

  useEffect(() => {
    if (!roomId) return;

    async function fetchMembers() {
      try {
        const res = await fetch(`${API_URL}/api/room/${roomId}/members`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) setMembers(data.members);
      }
      catch (error) {
        console.error('Failed to load members', error);
      }
    }

    fetchMembers();

  }, [roomId]);

  async function handleJoin(e) {
    e.preventDefault();
    setErrMsg("");
    setStatus("joining");

    try {
      const res = await fetch(`${API_URL}/api/room/${joinInput}/access`, {
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with ${res.status}`);
      }

      navigate(`/room/${joinInput}`);
    }
    catch (error) {
      setStatus("error");
      setErrMsg(error.message);
    }
  }

  async function handleInvite(e) {
    e.preventDefault();
    setInviteErr("");
    setInviteStatus("inviting");

    try {
      const res = await fetch(`${API_URL}/api/room/${roomId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: inviteEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with ${res.status}`);
      }

      setMembers((prev) => [...prev, { id: data.userId, email: inviteEmail }]);
      setInviteEmail("");
      setInviteStatus("idle");
    }
    catch (error) {
      setInviteStatus("error");
      setInviteErr(error.message);
    }
  }

  const { ydoc, provider } = useRoom(roomId);

  const ytext = useMemo(() => {
    if (!ydoc) return null;
    return ydoc.getText('codemirror');
  }, [ydoc]);

  const ychat = useMemo(() => {
    if (!ydoc) return null;
    return ydoc.getArray('chat');
  }, [ydoc]);

  const fixedHeightEditor = EditorView.theme({
    ".cm-scroller": { overflow: "auto" }
  })

  useEffect(() => {
    if (!provider || !user) return;

    provider.awareness.setLocalStateField('user', { email: user.email });

    function computeAndAnnounce() {
      const states = Array.from(provider.awareness.getStates().values());
      const emails = states.map((s) => s.user?.email).filter(Boolean);
      const newSet = new Set(emails);

      if (isFirstPresenceRun.current) {
        isFirstPresenceRun.current = false;
      } else {
        const prevSet = prevOnlineRef.current;

        const joined = [...newSet].filter((email) => !prevSet.has(email));
        const left = [...prevSet].filter((email) => !newSet.has(email));

        if (joined.length || left.length) {
          setSystemEvents((prev) => [
            ...prev,
            ...joined.map((email) => ({ type: 'system', text: `${email} joined the room`, timestamp: Date.now() })),
            ...left.map((email) => ({ type: 'system', text: `${email} left the room`, timestamp: Date.now() })),
          ]);
        }
      }

      prevOnlineRef.current = newSet;
      setOnlineEmails(newSet);
    }

    function handleAwarenessChange() {
      const states = Array.from(provider.awareness.getStates().values());
      const emails = states.map((s) => s.user?.email).filter(Boolean);
      setOnlineEmails(new Set(emails));

      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(computeAndAnnounce, 400);
    }

    provider.awareness.on('change', handleAwarenessChange);
    computeAndAnnounce();

    return () => {
      provider.awareness.off('change', handleAwarenessChange);
      clearTimeout(debounceTimerRef.current);
    };
  }, [provider, user]);

  useEffect(() => {
    if (!ychat) return;

    function updateMessages() {
      setChatMessages(ychat.toArray());
    }

    ychat.observe(updateMessages);
    updateMessages();

    return () => {
      ychat.unobserve(updateMessages);
    };
  }, [ychat]);

  const combinedFeed = useMemo(() => {
    return [...chatMessages, ...systemEvents].sort((a, b) => a.timestamp - b.timestamp);
  }, [chatMessages, systemEvents]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [combinedFeed]);

  function handleSendMessage(e) {
    e.preventDefault();
    if (!chatInput.trim() || !ychat || !user) return;

    ychat.push([{
      type: 'message',
      author: user.email,
      text: chatInput.trim(),
      timestamp: Date.now(),
    }]);

    setChatInput("");
  }

  function copyRoomId() {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleLeave() {
    navigate("/home");
  }

  if (!roomId) {
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

          {status === "error" && <p className="text-red-400 text-sm">{errMsg}</p>}

          <input
            type="submit"
            value={status === "joining" ? "Joining...." : "Join Room"}
            className="bg-amber-600 m-10 px-3 text-[26px] rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "joining"}
          ></input>

        </form>

      </div>
    );
  }

  if (!ydoc || !provider || !ytext) {
    return (
      <div className="bg-linear-to-b from-secondary-bg to-amber-900 from-30% flex flex-1 items-center justify-center">
        <p className="text-amber-700 text-[24px]">Connecting to room...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-linear-to-b from-secondary-bg to-amber-900 from-30% w-full h-full">

      <div className="basis-2/3 m-2 bg-black/50 rounded-md min-w-[70%]">

        <div className="flex items-center justify-between px-2 w-full h-1/20 bg-black overflow-hidden rounded-t-md ">
          <p className="text-amber-700 font-medium">{"</>"} Code Editor</p>

          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md text-xs text-white cursor-pointer hover:bg-white/20 transition-all duration-300 ease-in-out">
            <span>Room ID: {roomId}</span>
            <FaRegCopy />
            {copied && <span className="text-green-400">copied</span>}
          </button>
        </div>

        <div className="h-19/20 w-full rounded-b-md overflow-hidden ">
          <CodeMirror
            id="code-block"
            height="100%"
            extensions={[javascript(), yCollab(ytext, provider.awareness), fixedHeightEditor]}
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

      <div className="flex flex-col basis-1/3 m-1 max-w-[28%]">

        <div className="flex flex-col basis-2/3 m-1 bg-black/60 rounded-md overflow-hidden ">

          <div className="flex items-center justify-between px-2 w-full h-1/10 bg-black overflow-hidden rounded-t-md">
            <p className="text-amber-700 font-medium">Room Chat</p>

            <div className="relative">
              <button
                onClick={() => setShowMembers((prev) => !prev)}
                className="px-2 py-1 mr-5 bg-amber-700 rounded-md text-sm text-white cursor-pointer hover:bg-amber-800 transition-all duration-300 ease-in-out">
                {members.length} {members.length === 1 ? 'member' : 'members'} ▾
              </button>

              {showMembers && (
                <div className="fixed right-15 mt-2 bg-black/90 border border-amber-900 rounded-md py-1 z-10">
                  {members.length === 0 ? (
                    <p className="text-xs text-secondary-text px-3 py-1">No members yet</p>
                  ) : (
                    members.map((m) => (
                      <div
                        key={m.id}
                        className={`text-sm px-3 py-1 hover:bg-white/10 ${
                          onlineEmails.has(m.email) ? 'text-green-400' : 'text-white'
                        }`}>
                        {m.email}
                      </div>
                    ))
                  )}
                </div>
              )}

              <button
              onClick={() => {
                const confirm = window.confirm("Do you want to LEAVE the room ?");
                if(!confirm) return;
                handleLeave()}}
              className="px-2 py-1 bg-red-700 rounded-md text-sm text-white cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                Leave
              </button>

            </div>
          </div>

          <form onSubmit={handleInvite} className="flex items-center gap-1 px-2 py-2 border-b border-white/10">
            <input
              type="email"
              className="flex-1 px-2 py-1 bg-black/30 text-white text-sm rounded-md outline-none border border-amber-900"
              placeholder="Invite by email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
            <input
              type="submit"
              value={inviteStatus === "inviting" ? "..." : "Invite"}
              disabled={inviteStatus === "inviting"}
              className="bg-amber-600 px-3 py-1 text-sm rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>

          {inviteStatus === "error" && (
            <p className="text-red-400 text-xs px-2 pb-2">{inviteErr}</p>
          )}

          <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col scrollbar-thin scrollbar-thumb-amber-700">
            {combinedFeed.length === 0 ? (
              <p className="text-xs text-secondary-text text-center mt-4">No messages yet — say hello</p>
            ) : (
              combinedFeed.map((item, i) => {
                if (item.type === 'system') {
                  return (
                    <p key={`sys-${i}`} className="text-[11px] text-secondary-text text-center italic">
                      {item.text}
                    </p>
                  );
                }

                const isMine = item.author === user?.email;
                return (
                  <div key={`msg-${i}`} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} m-1`}>
                    <span className="text-[10px] text-secondary-text px-1">{isMine ? 'You' : item.author}</span>
                    <span className={`text-sm px-3 py-1 rounded-md max-w-[50%] wrap-break-word ${
                      isMine ? 'bg-amber-700 text-white' : 'bg-white/10 text-white'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-1 px-2 py-2 border-t border-white/10">
            <input
              type="text"
              className="flex-1 px-2 py-1 bg-black/30 text-white text-sm rounded-md outline-none border border-amber-900"
              placeholder="Type a message"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-amber-600 px-3 py-1 text-sm rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer">
              Send
            </button>
          </form>

        </div>

        <div className="basis-1/3 m-1 bg-black/50 rounded-md font-mono">

          <div className="flex items-center justify-between px-2 w-full h-1/6 bg-black overflow-hidden rounded-t-md">
            <p className="text-amber-700 font-medium">OUTPUT</p>

            <button
            onClick={handleRun}
            disabled={running}
            className="px-2 py-1 bg-green-700 rounded-md text-sm text-white cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out disabled:opacity-50">
            {running ? "Running..." : "▶ Run"}
            </button>

          </div>
          
          <div className="flex-1 overflow-y-auto px-2 py-2 text-sm">
            {output.length === 0 ? (
              <p className="text-green-400"><span className="inline-block px-1">{">"}</span>Run your code to see output</p>
            ) : (
              output.map((line, i) => (
                <p key={i} className={line.type === 'error' ? 'text-red-400' : 'text-green-400'}>
                  <span className="inline-block px-1">{line.type === "error" ? "⚠️" : ">"}</span>{line.text}
                </p>
              ))
            )}
          </div>
        
        </div>

      </div>

    </div>
  );
}

export default Room;