import React, { useContext, useEffect } from 'react'
import { AuthDataContext } from './AuthContext';

function CurrentUser() {
  const authContext = useContext(AuthDataContext);
  const {setData,currentUser } = authContext;
  useEffect(()=>{
    (async () => {
        try {
            // const res = 
        } catch (error) {
            
        }
    })();       
       
    },[])
    return null
}

export default CurrentUser
