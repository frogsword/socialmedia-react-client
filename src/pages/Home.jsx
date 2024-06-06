import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Tweet from "../components/Tweet";
import "../styles/home-page.css";
import {AuthContext} from "../context/auth-context.jsx";
import PostTweet from "../components/PostTweet.jsx";
import {Avatar} from "@chakra-ui/react";

function Home({user}) {
    const navigate = useNavigate()
    const {authenticateUser} = useContext(AuthContext)

    let currentTime = new Date()

    const [currUser, setCurrUser] = useState(user)
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)

    const getTweets = async () => {
        const response = await fetch("http://localhost:8080/api/tweets/all", {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setTweets(res)
        setLoading(false)
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
    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        return (
            <div className='home-page'>
                <div style={{paddingTop: '10px'}}>
                    <Link to={`/profile/${currUser.name}`} onClick={(e) => {
                        e.stopPropagation()
                        return navigate(`/profile/${currUser.name}`)
                    }}>
                        <Avatar size='lg' src={"data:image/jpeg;base64," + currUser.profilePicture}
                                _hover={{filter: "brightness(80%)", transition: "0.25s"}}/>
                    </Link>
                </div>
                <div className='home-main'>
                    <PostTweet message={"Tweet Something..."}/>
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
}

export default Home