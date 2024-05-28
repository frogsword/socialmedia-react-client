import { useState } from "react"
import { Input, Stack, FormControl, FormErrorMessage, Button, Spinner } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit() {
        if (email === '' || password === '') {
            setErrMsg("Email and Password must not be empty.")
            setIsError(true)
        }
        else if (!email.includes("@")) {
            setErrMsg("Email must be valid.")
            setIsError(true)
        }
        else if (password.toLowerCase() === password) {
            setErrMsg("Password must contain at least one uppercase character.")
            setIsError(true)
        }
        else if (password.length < 8) {
            setErrMsg("Password must be at least 8 characters long.")
            setIsError(true)
        }
        else {
            setLoading(true)

            await fetch('http://localhost:8080/api/auth/login', {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email, password}) 
            })
            .then(() => {
                setIsError(false)
                setLoading(false)
                navigate("/")
            })
        }
    }
    
    return (
        <>
            {loading && (
                <Spinner />
            )}

            <FormControl isInvalid={isError}>

                <Stack spacing={3}>
                    <Input type="email" placeholder='Email' size='md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder='Password' size='md' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" onClick={() => handleSubmit()}>Login</Button>
                </Stack>

                {isError && (
                    <FormErrorMessage>{errMsg}</FormErrorMessage>
                )}
            </FormControl>
        </>
    )
}

export default Login