// https://medium.com/trabe/implementing-private-routes-with-react-router-and-hooks-ed38d0cf93d5
import React, { createContext, useState, useContext } from 'react';
import { removeToken } from '../utils';

export const AuthDataContext = createContext(null);

const AuthDataProvider = props => {
  const initAuthData = {
    fetchingUser: false
    
  };
  const token = localStorage.getItem('access_token');
  if (token){
    initAuthData.token = token;
  }
  // Seperate state to make sure not conflict
  const [authData, setAuth] = useState(initAuthData);

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     setAuthData({token, fetching: true});
  //   }
  // }, []);

  const resetData = () => {
      removeToken();
      setAuth({fetchingUser: false});
  };
  
  const setData = (data, type) => {
    if (type === 'user') {
      setAuth({...authData, ...data});
    } 
  };


  return <AuthDataContext.Provider value={{...authData, setData, resetData}} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;