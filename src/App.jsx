import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/auth-context";

function App() {
    return (
        <ChakraProvider>
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
        </ChakraProvider>
    )
}

export default App
