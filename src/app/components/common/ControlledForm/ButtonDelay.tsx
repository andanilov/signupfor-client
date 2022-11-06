import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';

interface IButtonDelay {
  delay?: number,
  delayText?: string,
  children: ReactNode | ReactNode[],
  handler: () => void,
  className?: string,
}

const ButtonDelay = ({
  children,
  delay = 3,
  delayText = 'Отменить',
  handler,
  className = '',
} : IButtonDelay) => {
  const ntrvl = useRef<number|null>(null); // Current interval id
  const [time, setTime] = useState<number|undefined>(); // Current seconds left to apply

  const counter = () => {
    setTime(() => delay);
    return window.setInterval(() => setTime((prevState) => prevState && prevState - 1), 1000);
  };
  const killCounter = (counterId: number) => {
    window.clearInterval(counterId);
    setTime(() => undefined);
    ntrvl.current = null;
  };
  const toggleClick = () => (
    ntrvl.current
      ? killCounter(ntrvl.current)
      : (ntrvl.current = counter()));

  useEffect(() => {
    if (time !== undefined && time <= 0) {
      ntrvl.current && killCounter(ntrvl.current);
      handler();
    }
  }, [time]);
  useEffect(() => () => {
    ntrvl.current && clearInterval(ntrvl.current);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleClick}
      className={className}
    >
      {time ? `${delayText} ${time}` : children}
    </button>
  );
};

export default ButtonDelay;
