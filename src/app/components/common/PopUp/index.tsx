import React, {
  FC,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { usePopUp } from './usePopUp';

interface IPopUp {
  children: ReactNode,
  isOpenedDefault?: boolean,
}

const PopUp : FC<IPopUp> = ({ children, isOpenedDefault }) => {
  const {
    isOpened,
    toggleHandle,
    openPopUp,
    closePopUp,
  } = usePopUp();
  const sectionRef = useRef(null);

  useEffect(() => { (isOpenedDefault !== undefined) && (isOpenedDefault ? openPopUp() : closePopUp()); }, []);

  return (
    <section
      ref={sectionRef}
      onClick={(event) => event.target === sectionRef.current && toggleHandle(event)}
      className="popup"
      style={isOpened ? {} : { display: 'none' }}
      role="dialog"
    >
      <div className="container">
        <div className="popup__content">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PopUp;
