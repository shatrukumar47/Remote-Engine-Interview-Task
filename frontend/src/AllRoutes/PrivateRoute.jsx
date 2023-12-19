import React from 'react'
import { Navigate , useLocation} from 'react-router-dom';
import { getItemLS } from '../utils/localStorage';

const PrivateRoute = ({children}) => {
 
    const token = getItemLS("accessToken") || "";

    const location = useLocation()
    
    if(!token){
        if(location.pathname === "/client-profile"){
            return <Navigate to={"/login-client"} />
        }else{
            return <Navigate to={"/login-developer"} />
        }
    }

  return children;
}

export default PrivateRoute
