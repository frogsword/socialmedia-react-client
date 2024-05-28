import { createContext } from 'react';

export const AuthContext = createContext(null)

export const AuthContextProvider = (props) => {
    const authenticateUser = async() => {
        const response = await fetch('http://localhost:8080/api/auth/authenticate', {
            method: "GET",
            mode: "cors",
            credentials: "include"
        })
        const res = await response.json()
        if (res.status && res.status == 500) {
            return null
        }
        return res
    }

    const contextValue = {authenticateUser}
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}