import {Link as ReactRouterLink, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Link as ChakraLink} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import Tweet from "../components/Tweet.jsx";
import PostTweet from "../components/PostTweet.jsx";
import {AuthContext} from "../context/auth-context.jsx";

function Thread() {
    const context = useContext(AuthContext);
    const navigate = useNavigate()

    const [parents, setParents] = useState([])
    const [main, setMain] = useState({})
    const [children, setChildren] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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
        console.log(res)

        setParents(res.parents)
        setMain(res.mainTweet)
        setChildren(res.children)
        setLoading(false)
    }

    useEffect(() => {
        async function authenticate() {
            const user = await context.authenticateUser()

            if (!user || user.status == 403 || user.status == 500) {
                navigate("/login")
            }

            setUser(user)
        }

        authenticate()
        getThreadTweets()
    }, [context.reloadTweets])

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        return (
            <div className="profile-page">
                <div className="profile-main">
                    <div className='profile-nav'>
                        <ChakraLink as={ReactRouterLink} to='/' className='nav-link-back'>
                            <ArrowBackIcon/>
                        </ChakraLink>
                    </div>

                    {parents.map((tweet) => {
                        if (!tweet.deleted) {
                            return (
                                <Tweet key={tweet.id} tweet={tweet} currentUser={user} currentTime={currentTime}
                                       style={"linear-gradient(gray, gray) no-repeat center/2px 100%"}/>
                            )
                        } else {
                            return (
                                <div key={tweet.id}>Tweet has been deleted by author.</div>
                            )
                        }
                    })}

                    <Tweet key={main.id} tweet={main} currentUser={user} currentTime={currentTime}/>
                    <PostTweet key={id} message={"Reply..."} parentId={main.id}/>

                    {children.map((tweet) => {
                        if (!tweet.deleted) {
                            return (
                                <Tweet key={tweet.id} tweet={tweet} currentUser={user} currentTime={currentTime}/>
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
}

export default Thread;