import React, {
  ReactNode,
  useContext,
  FC,
  useState,
  useCallback,
} from 'react';
import { INotice } from './Notice';

interface INoticesProvider {
  children: ReactNode | ReactNode[],
}

interface INoticesContext {
  notices: INotice[],
  updateNotice(): INotice[],
  pushNotice(notice: INotice): void,
  unshiftNotice(notice: INotice): void,
  deleteNotice(indexNotice: number): void,
}

const NoticesContext = React.createContext<INoticesContext>({
  notices: [],
  updateNotice: () => [],
  pushNotice: () => {},
  unshiftNotice: () => {},
  deleteNotice: () => {},
});
export const useNotices = () => useContext(NoticesContext);

const NoticesProvider : FC<INoticesProvider> = ({ children }) => {
  const [notices, setNotices] = useState<INotice[]>([]);

  // Getting notices list and deleting temporary notice
  const updateNotice = () => {
    if (!notices.length) return [];
    const noticesCurrent = [...notices];
    const noticesUpdated = notices.filter((notice) => notice?.constant);
    setNotices(() => noticesUpdated);
    return noticesCurrent;
  };

  const pushNotice = useCallback((notice: INotice) => setNotices((prevNotices) => [...prevNotices, notice]), []);
  const unshiftNotice = useCallback((notice: INotice) => setNotices((prevNotices) => [notice, ...prevNotices]), []);
  const deleteNotice = useCallback((index: number) => setNotices((prevNotices) => prevNotices.splice(index, 1)), []);

  return (
    <NoticesContext.Provider value={{
      notices,
      updateNotice,
      pushNotice,
      unshiftNotice,
      deleteNotice,
    }}
    >
      {children}
    </NoticesContext.Provider>
  );
};

export default NoticesProvider;
