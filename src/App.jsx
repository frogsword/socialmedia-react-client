import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {ChakraProvider} from "@chakra-ui/react";
import {AuthContext} from "./context/auth-context";
import {useContext, useEffect} from "react";
import Profile from "./pages/Profile";
import Thread from "./pages/Thread.jsx";
import Register from "./pages/Register.jsx";

function App() {
    const {authenticateUser, authenticatedUser} = useContext(AuthContext)

    useEffect(() => {
        async function authenticate() {
            await authenticateUser()
        }

        authenticate()
    }, [])

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home user={authenticatedUser}/>}></Route>
                    <Route path="/thread/:id" element={<Thread/>}></Route>
                    <Route path="/profile/:name" element={<Profile currentUser={authenticatedUser}/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App
