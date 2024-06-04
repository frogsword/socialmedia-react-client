import {Avatar, Button, Icon, Image, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import {Link} from "react-router-dom";
import "../styles/tweet.css"
import {useState} from "react";
import TweetOptions from "./TweetOptions.jsx";
import {GoHeart, GoHeartFill} from "react-icons/go";

function Tweet({tweet, currentTime, currentUser}) {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const currentUserIsAuthor = currentUser.id == tweet.userId

    const dateCreated = new Date(tweet.createdAt)
    const diffTime = Math.abs(currentTime - dateCreated) //returns milliseconds
    let timeDifference
    let timeDifferenceString

    //difference in days
    if (diffTime > 86400000) {
        timeDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        timeDifferenceString = `${timeDifference} d`
    }
    //difference in hours
    else if (diffTime > 3600000) {
        timeDifference = Math.floor(diffTime / (1000 * 60 * 60));
        timeDifferenceString = `${timeDifference} hr`
    }
    //difference in minutes
    else {
        timeDifference = Math.floor(diffTime / (1000 * 60));
        timeDifferenceString = `${timeDifference} min`
    }


    const [tweetIsLiked, setTweetIsLiked] = useState(currentUser.likedTweets.includes(tweet.id))
    const [toggleLikeLoading, setToggleLikeLoading] = useState(false)
    const [likeCount, setLikeCount] = useState(tweet.likeCount)
    const toggleLike = async () => {
        setToggleLikeLoading(true)
        await fetch(`http://localhost:8080/api/tweets/${tweet.id}/like`, {
            method: "PUT",
            mode: "cors",
            credentials: 'include'
        })
            .then(() => setTweetIsLiked(!tweetIsLiked))
            .then(() => setToggleLikeLoading(false))
    }

    return (
        <div id={tweet.id} className="tweet-main">

            <div className='tweet-left-column'>
                <Link to={`/profile/${tweet.userName}`}>
                    <Avatar size='lg' src={"data:image/jpeg;base64," + tweet.userPfp}
                            _hover={{filter: "brightness(80%)", transition: "0.25s"}}/>
                </Link>
            </div>

            <div className='tweet-right-column'>

                <div className='tweet-top-row'>
                    <div className='tweet-info'>
                        <span>
                            <Link to={`/profile/${tweet.userName}`} className='profile-link'>
                                <b>{tweet.userChangeableName}</b>
                            </Link>
                        </span>
                        <span style={{color: 'gray'}}> @{tweet.userName}</span>
                        <span style={{color: 'gray'}}> · {timeDifferenceString} </span>
                    </div>
                    {currentUserIsAuthor && (
                        <TweetOptions tweetId={tweet.id}/>
                    )}
                </div>

                <div className='tweet-middle-row'>
                    <div>{tweet.body}</div>
                    {tweet.image && (
                        <Image height='350px' borderRadius='20px' border='1px solid gray' onClick={onOpen}
                               src={"data:image/jpeg;base64," + tweet.image}/>
                    )}
                </div>


                <div className='tweet-bottom-row'>
                    <Button>Reply</Button>

                    {tweetIsLiked && (
                        <Button variant='ghost' size='lg' borderRadius='full'
                                leftIcon={<Icon as={GoHeartFill} size='lg'/>}
                                isDisabled={toggleLikeLoading}
                                style={{border: "none", color: "white"}}
                                _hover={{border: "1px solid red", color: "red"}}
                                _active={{border: "none", color: "white"}}
                                onClick={() => {
                                    setLikeCount(likeCount - 1)
                                    toggleLike()
                                }}>{likeCount}</Button>
                    )}
                    {!tweetIsLiked && (
                        <Button variant='ghost' size='lg' borderRadius='full'
                                leftIcon={<Icon as={GoHeart} size='lg'/>}
                                isDisabled={toggleLikeLoading}
                                style={{border: "none", color: "white"}}
                                _hover={{border: "none", color: "red"}}
                                _active={{border: "none", color: "white"}}
                                onClick={() => {
                                    setLikeCount(likeCount + 1)
                                    toggleLike()
                                }}>{likeCount}</Button>
                    )}
                </div>

            </div>

            <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
                <ModalOverlay backdropFilter='blur(10px)'/>
                <ModalContent>
                    <Image
                        src={"data:image/jpeg;base64," + tweet.image}/>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Tweet