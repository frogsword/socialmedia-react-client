import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {ChakraProvider} from "@chakra-ui/react";
import {AuthContext} from "./context/auth-context";
import {useContext, useEffect, useState} from "react";
import Profile from "./pages/Profile";

function App() {
    const {authenticateUser} = useContext(AuthContext)

    const [user, setUser] = useState({})

    useEffect(() => {
        async function authenticate() {
            const res = await authenticateUser()
            setUser(res)
        }

        authenticate()
    }, [])

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home user={user}/>}></Route>
                    <Route path="/profile/:name" element={<Profile currentUser={user}/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App
