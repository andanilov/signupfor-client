import React, {
  ReactNode,
  useContext,
  FC,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { INotice } from './Notice';
import apiNoticeMap from './apiNoticeMap';

interface INoticesProvider {
  children: ReactNode | ReactNode[],
}

interface INoticesContext {
  notices: INotice[],
  updateNotice(): INotice[],
  isNoticeExists(notice: INotice): boolean,
  pushNotice(notice: INotice): void,
  pushNoticeUnique(notice: INotice): void,
  unshiftNotice(notice: INotice): void,
  deleteNotice(indexNotice: number): void,
}

const NoticesContext = React.createContext<INoticesContext>({
  notices: [],
  updateNotice: () => [],
  isNoticeExists: () => false,
  pushNotice: () => {},
  pushNoticeUnique: () => {},
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

  const isNoticeExists = useCallback((notice: INotice) => notices.some(({ children }) => notice.children
    && notice.children === children), []);

  const pushNotice = useCallback((notice: INotice) => setNotices((prevNotices) => [...prevNotices, notice]), []);
  const pushNoticeUnique = useCallback((notice: INotice) => !isNoticeExists(notice) && pushNotice(notice), []);
  const unshiftNotice = useCallback((notice: INotice) => setNotices((prevNotices) => [notice, ...prevNotices]), []);
  const deleteNotice = useCallback((index: number) => setNotices((prevNotices) => prevNotices.splice(index, 1)), []);

  // -- Add message from server by GET parameters (api-msg)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const apiMsg = queryParams.get('apiMsg');
    apiMsg && apiNoticeMap[apiMsg] && pushNotice(apiNoticeMap[apiMsg]);
  }, []);
  // }

  return (
    <NoticesContext.Provider value={{
      notices,
      isNoticeExists,
      updateNotice,
      pushNoticeUnique,
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
