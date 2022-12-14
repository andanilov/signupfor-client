import React, {
  createContext,
  FC,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IPopUpProvider {
  children: ReactNode | ReactNode[],
}

interface IusePopUp {
  isOpened: boolean,
  toggleHandle: MouseEventHandler,
  openPopUp: Function,
  closePopUp: Function,
}

const PopUpContext = createContext<IusePopUp>({
  toggleHandle: () => {},
  isOpened: false,
  openPopUp: () => {},
  closePopUp: () => {},
});
export const usePopUp = () : IusePopUp => useContext(PopUpContext);

const PopUpProvider : FC<IPopUpProvider> = ({ children }) => {
  const [isOpened, toggle] = useState<boolean>(false);

  const popUpValue = useMemo(() : IusePopUp => ({
    isOpened,
    toggleHandle: () => toggle((prevState : boolean) => !prevState),
    openPopUp: () => toggle(() => true),
    closePopUp: () => toggle(() => false),
  }), [isOpened]);

  return (
    <PopUpContext.Provider value={popUpValue}>
      {children}
    </PopUpContext.Provider>
  );
};

export default PopUpProvider;
