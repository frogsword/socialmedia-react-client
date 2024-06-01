import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Tweet from "../components/Tweet";
import "../styles/home-page.css";
import {AuthContext} from "../context/auth-context.jsx";

function Home({user}) {
    const navigate = useNavigate()
    const {authenticateUser} = useContext(AuthContext)

    const [currUser, setCurrUser] = useState(user)

    const [tweets, setTweets] = useState([])

    const getTweets = async () => {
        const response = await fetch("http://localhost:8080/api/tweets/all", {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setTweets(res)
    }

    useEffect(() => {
        async function authenticate() {
            const res = await authenticateUser()
            setCurrUser(res)
        }

        authenticate()

        if (!currUser || currUser.status == 403 || currUser.status == 500) {
            navigate("/login")
        }

        getTweets()
    }, [])

    return (
        <>
            {(currUser && !currUser.status) && (
                <div>{currUser.email}</div>
            )}
            {(!currUser || currUser.status == 403 || currUser.status == 500) && (
                <Link to='/login'>Please Log In</Link>
            )}

            {tweets.map((tweet) => {
                return (
                    <Tweet tweet={tweet}/>
                )
            })}
        </>
    )
}

export default Home