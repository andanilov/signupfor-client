import { createContext, FC, MouseEventHandler, ReactNode, useContext, useState } from "react";

interface IPopUpProvider {
  children: ReactNode | ReactNode[],
}

interface IusePopUp {
  isOpened: boolean,
  toggleHandle: MouseEventHandler,
}

const PopUpContext = createContext<IusePopUp>({ toggleHandle: () => {}, isOpened: false });
export const usePopUp = () : IusePopUp => useContext(PopUpContext);

const PopUpProvider : FC<IPopUpProvider> = ({ children }) => {
  const [isOpened, toggle] = useState<boolean>(false);

  return (
    <PopUpContext.Provider value={{
      isOpened,
      toggleHandle: () => toggle((prevState : boolean) => !prevState),
      } as IusePopUp}
    >
      {children}
    </PopUpContext.Provider>
  );
}

export default PopUpProvider;
