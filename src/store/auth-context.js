import React,{ useState }  from 'react';

const AuthContext  = React.createContext({
    token : '',
    isLoggedIn : false,
    logout : () => {},
    login : (tokenId)=>{}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token,setToken] = useState(initialToken);

    const userLoggedIn = !!token;

    const loginHandler = (tokenId) => {
        setToken(tokenId);
        localStorage.setItem('token',tokenId);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const initialContext = {
        token : token,
        isLoggedIn : userLoggedIn,
        logout : logoutHandler,
        login : loginHandler
    }

    return (
        <AuthContext.Provider value={initialContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
