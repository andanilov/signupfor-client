import React, { FC, useEffect, useMemo } from 'react';
import { useNotices } from '.';
import Notice from './Notice';

const Notices : FC = () => {
  const { updateNotice, notices } = useNotices();
  useEffect(() => { updateNotice(); }, []);
  return (<>{notices.map((notice, i) => <Notice key={Math.random()} {...notice} />)}</>);
};

export default Notices;
