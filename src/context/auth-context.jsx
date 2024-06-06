import {createContext, useState} from 'react';

export const AuthContext = createContext(null)

export const AuthContextProvider = (props) => {
    const [authenticatedUser, setUser] = useState(null);
    const [reloadTweets, setReloadTweets] = useState(false);

    const authenticateUser = async () => {
        const response = await fetch('http://localhost:8080/api/auth/authenticate', {
            method: "GET",
            mode: "cors",
            credentials: "include"
        })
        const res = await response.json()
        if (res.status && res.status == 500) {
            return null
        }
        setUser(res)
        return res
    }

    const contextValue = {authenticateUser, authenticatedUser, setUser, reloadTweets, setReloadTweets}
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}