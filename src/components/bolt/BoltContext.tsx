import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

/** "unavailable" means the page shows the flat logo instead of the 3D bolt. */
export type BoltStatus = 'loading' | 'ready' | 'unavailable';

interface BoltContextValue {
  anchors: RefObject<Set<HTMLElement>>;
  status: BoltStatus;
  setStatus: (status: BoltStatus) => void;
}

const BoltContext = createContext<BoltContextValue | null>(null);

export function BoltProvider({ children }: { children: ReactNode }) {
  const anchors = useRef(new Set<HTMLElement>());
  const [status, setStatus] = useState<BoltStatus>('loading');
  const value = useMemo(() => ({ anchors, status, setStatus }), [status]);
  return <BoltContext.Provider value={value}>{children}</BoltContext.Provider>;
}

export function useBolt(): BoltContextValue {
  const context = useContext(BoltContext);
  if (!context) throw new Error('useBolt must be used inside BoltProvider');
  return context;
}
