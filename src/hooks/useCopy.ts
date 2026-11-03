import { useCallback, useEffect, useRef, useState } from 'react';

const COPIED_MS = 1500;

/** Copies text and reports success for a moment. If the browser refuses, nothing is shown. */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      setCopied(false);
    }
  }, []);

  return { copied, copy };
}
