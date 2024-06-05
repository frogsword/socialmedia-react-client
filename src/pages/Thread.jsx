import {Link as ReactRouterLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link as ChakraLink} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import Tweet from "../components/Tweet.jsx";
import PostTweet from "../components/PostTweet.jsx";

//TODO COMMENTS DO NOT APPEAR IN THREAD: FIX!
//
//
//
//

function Thread({currentUser}) {
    const [tweets, setTweets] = useState([])

    const location = useLocation()
    const path = location.pathname
    const id = path.slice(8, path.length)

    let currentTime = new Date()

    const getThreadTweets = async () => {
        const response = await fetch("http://localhost:8080/api/tweets/" + id, {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setTweets(res)
    }

    useEffect(() => {
        getThreadTweets()
    }, [])

    return (
        <div className="profile-page">
            <div className="profile-main">
                <div className='profile-nav'>
                    <ChakraLink as={ReactRouterLink} to='/' className='nav-link-back'>
                        <ArrowBackIcon/>
                    </ChakraLink>
                </div>

                {tweets.map((tweet) => {
                    if (tweet.id === id) {
                        return (
                            <>
                                <Tweet key={tweet.id} tweet={tweet} currentUser={currentUser}
                                       currentTime={currentTime}/>
                                <PostTweet key={id} message={"Reply..."} parentId={tweet.id}/>
                            </>
                        )
                    }
                    if (!tweet.deleted) {
                        return (
                            <Tweet key={tweet.id} tweet={tweet} currentUser={currentUser} currentTime={currentTime}/>
                        )
                    } else {
                        return (
                            <div key={tweet.id}>Tweet has been deleted by author.</div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Thread;