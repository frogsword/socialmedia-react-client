import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tweet from "../components/Tweet";

function Home({ user }) {
    const [tweets, setTweets] = useState([])

    const getTweets = async() => {
        const response = await fetch("http://localhost:8080/api/tweets/all", {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setTweets(res)
    }

    useEffect(() => {
        getTweets()
    }, [])

    return (
        <>
            {(user && !user.status) && (
                <div>{user.email}</div>
            )}
            {(!user || user.status == 403 || user.status == 500) && (
                <Link to='/login'>Please Log In</Link>
            )}

            {tweets.map((tweet) => {
                return (
                    <Tweet tweet={tweet} />
                )
            })}
        </>
    )
}

export default Home