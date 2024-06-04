import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Tweet from "../components/Tweet";
import "../styles/home-page.css";
import {AuthContext} from "../context/auth-context.jsx";
import PostTweet from "../components/PostTweet.jsx";

function Home({user}) {
    const navigate = useNavigate()
    const {authenticateUser} = useContext(AuthContext)

    let currentTime = new Date()

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

            if (!res || res.status == 403 || res.status == 500) {
                navigate("/login")
            }

            setCurrUser(res)
        }

        authenticate()
        getTweets()
    }, [])

    return (
        <div className='home-page'>
            <div className='home-main'>
                <PostTweet/>
                {tweets.map((tweet) => {
                    if (!tweet.deleted) {
                        return (
                            <Tweet key={tweet.id} tweet={tweet} currentUser={currUser} currentTime={currentTime}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Home