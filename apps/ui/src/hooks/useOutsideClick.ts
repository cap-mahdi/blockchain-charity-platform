import { useEffect, useRef } from 'react';

interface UseOutsideClickOptions {
  handler: () => void;
  listenCapturing?: boolean;
}

export function useOutsideClick({
  handler,
  listenCapturing = true,
}: UseOutsideClickOptions) {
  const ref = useRef<any>();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
