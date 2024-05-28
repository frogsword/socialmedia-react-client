import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth-context"

function Home() {
    const { authenticateUser } = useContext(AuthContext)

    const [user, setUser] = useState({})

    useEffect(() => {
        async function authenticate() {
            const res = await authenticateUser()
            setUser(res)
        }
        authenticate()
    }, [])

    return (
        <>
            {user && (
                <div>{user.email}</div>
            )}
            {!user && (
                <div>Please log in</div>
            )}
        </>
    )
}

export default Home