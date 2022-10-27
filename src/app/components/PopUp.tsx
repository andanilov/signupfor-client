import React, { FC, ReactNode, useRef} from 'react';
import { usePopUp } from '../hooks/usePopUp';

interface IPopUp {
  children: ReactNode,
}

const PopUp : FC<IPopUp> = ({ children }) => {
  const { isOpened, toggleHandle } = usePopUp();
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      onClick={(event) => event.target === sectionRef.current && toggleHandle(event) }
      className="popup"
      style={!!isOpened ? {} : { display: 'none' }}
    >
      <div className="container">
        <div className="popup__content">
          PopUp
          {children}
        </div>
      </div>
    </section>
  );
}

export default PopUp;
