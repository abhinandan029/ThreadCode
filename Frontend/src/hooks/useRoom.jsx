import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

export function useRoom(roomId) {
  const [ydoc, setYdoc] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const doc = new Y.Doc();
    const wsProvider = new HocuspocusProvider({
      url: import.meta.env.VITE_WS_URL,
      name: roomId,
      document: doc,
      token: localStorage.getItem('wsToken'),
    });

    setYdoc(doc);
    setProvider(wsProvider);

    return () => {
      wsProvider.destroy();
      doc.destroy();
    };
  }, [roomId]);

  return { ydoc, provider };
}

export function generateRoom() {
  return {
    roomId: nanoid(12),
    roomName: 'untitled',
  };
}