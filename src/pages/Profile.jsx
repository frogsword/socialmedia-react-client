import {useEffect, useState} from "react"
import {Link as ReactRouterLink, useLocation} from "react-router-dom"
import {ArrowBackIcon} from '@chakra-ui/icons'
import {Link as ChakraLink} from '@chakra-ui/react'
import Tweet from "../components/Tweet"
import ProfileHeader from "../components/ProfileHeader.jsx";
import "../styles/profile-page.css"

function Profile({currentUser}) {
    const [profileUser, setProfileUser] = useState({})
    const [profileTweets, setProfileTweets] = useState([])

    const location = useLocation()
    const path = location.pathname
    const name = path.slice(9, path.length)

    let currentTime = new Date()

    const getProfileTweets = async () => {
        const response = await fetch("http://localhost:8080/api/tweets/user/" + name, {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setProfileTweets(res)
    }

    const getProfileUser = async () => {
        const response = await fetch("http://localhost:8080/api/users/" + name, {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setProfileUser(res)
    }

    useEffect(() => {
        getProfileUser()
        getProfileTweets()
    }, [])

    return (
        <div className="profile-page">
            <div className="profile-main">
                <div className='profile-nav'>
                    <ChakraLink as={ReactRouterLink} to='/' className='nav-link-back'>
                        <ArrowBackIcon/>
                    </ChakraLink>
                </div>

                {(profileUser && profileUser.name) && (
                    <ProfileHeader profileUser={profileUser} currentUser={currentUser}/>
                )}

                {profileTweets.map((tweet) => {
                    if (!tweet.deleted) {
                        return (
                            <Tweet key={tweet.id} tweet={tweet} currentUser={currentUser} currentTime={currentTime}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Profile