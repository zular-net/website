import { createContext, useContext, useMemo, useRef, useState } from 'react';

const BoltContext = createContext(null);

export function BoltProvider({ children }) {
  const anchors = useRef(new Set());
  // loading | ready | unavailable
  const [status, setStatus] = useState('loading');
  const value = useMemo(() => ({ anchors, status, setStatus }), [status]);
  return <BoltContext.Provider value={value}>{children}</BoltContext.Provider>;
}

export function useBolt() {
  const context = useContext(BoltContext);
  if (!context) throw new Error('useBolt must be used inside BoltProvider');
  return context;
}
