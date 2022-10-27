import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import config from '../config';
import { getRoutesMapByUser } from './routes';

// import api from './http/api';
// const testRequest = async () => {
//   try {
//     const response = await api.get(config.API_URL + 'testjson');
//     console.log('Response = ', response);    
//   } catch (e) {
//     console.log(e);    
//   }
// };

const App : FC  = () => {
  // console.log('API URL = ', config.API_URL);
  // useEffect(() => { testRequest(); }, []);
  const router = createBrowserRouter(getRoutesMapByUser(undefined, undefined));

  return (<RouterProvider router={router} />);
}

export default App;
