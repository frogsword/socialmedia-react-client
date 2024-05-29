import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Avatar } from '@chakra-ui/react'
import Tweet from "../components/Tweet"

function Profile() {
    const [profileUser, setProfileUser] = useState({})
    const [profileTweets, setProfileTweets] = useState([])

    const location = useLocation()
    const path = location.pathname
    const name = path.slice(9, path.length)

    const getProfileTweets = async() => {
        const response = await fetch("http://localhost:8080/api/tweets/user/"+name, {
            method: "GET",
            mode: 'cors',
            credentials: 'include'
        })
        const res = await response.json()

        setProfileTweets(res)
    }

    const getProfileUser = async() => {
        const response = await fetch("http://localhost:8080/api/users/"+name, {
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
            <Link to='/'>Home</Link>
            {(profileUser && profileUser.name) && (
                <>
                    <Avatar size='2xl' src={"data:image/jpeg;base64," + profileUser.profilePicture} border='3px solid black' />
                    <div>{profileUser.name}</div>
                </>
            )}
            {profileTweets.map((tweet) => {
                return (
                    <Tweet tweet={tweet} />
                )
            })}
        </div>
    )
}

export default Profile