import { useEffect, useRef } from 'react';

export const ScrollToTopSamePage = ({ trigger }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [trigger]);

  return <div ref={ref}></div>;
};
