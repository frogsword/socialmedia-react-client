import {useState} from "react"
import {Button, FormControl, FormErrorMessage, Input, Spinner, Stack} from '@chakra-ui/react'
import {Link, useNavigate} from "react-router-dom";
import "../styles/auth-form.css"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit() {
        if (email === '' || password === '' || name == '') {
            setErrMsg("Name, Email, and Password must not be empty.")
            setIsError(true)
        } else if (!email.includes("@")) {
            setErrMsg("Email must be valid.")
            setIsError(true)
        } else if (password.toLowerCase() === password) {
            setErrMsg("Password must contain at least one uppercase character.")
            setIsError(true)
        } else if (password.length < 8) {
            setErrMsg("Password must be at least 8 characters long.")
            setIsError(true)
        } else if (password !== confirmPassword) {
            setErrMsg("Passwords must match")
            setIsError(true)
        } else {
            setLoading(true)

            await fetch('http://localhost:8080/api/auth/signup', {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({name, email, password, confirmPassword})
            })
                .then(() => {
                    setIsError(false)
                    setLoading(false)
                    navigate("/login")
                })
        }
    }

    return (
        <div className='auth-main'>
            {loading && (
                <Spinner/>
            )}

            <div className='auth-form'>
                <h1>Register</h1>
                <FormControl isInvalid={isError}>
                    <Stack spacing={3}>
                        <Input type="text" placeholder='Name' size='md' value={name} _placeholder={{color: "white"}}
                               onChange={(e) => setName(e.target.value)}/>
                        <Input type="email" placeholder='Email' size='md' value={email} _placeholder={{color: "white"}}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <Input type="password" placeholder='Password' size='md' value={password}
                               _placeholder={{color: "white"}}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <Input type="password" placeholder='Confirm Password' size='md' value={confirmPassword}
                               _placeholder={{color: "white"}}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <Button type="submit" colorScheme='teal' onClick={() => handleSubmit()}>Register</Button>
                    </Stack>
                    {isError && (
                        <FormErrorMessage>{errMsg}</FormErrorMessage>
                    )}
                </FormControl>
                <Link to={"/login"}>or login here</Link>
            </div>
        </div>
    )
}

export default Register