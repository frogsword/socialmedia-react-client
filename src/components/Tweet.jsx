import {
    Avatar,
    Button,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalContent,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react"
import {Link} from "react-router-dom";
import "../styles/tweet.css"
import {SettingsIcon} from "@chakra-ui/icons";
import {useState} from "react";

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
                    <Avatar size='lg' src={"data:image/jpeg;base64," + tweet.userPfp} border='2px solid gray'/>
                </Link>
            </div>

            <div className='tweet-right-column'>

                <div className='tweet-top-row'>
                    <div className='tweet-info'>
                        <b><span>{tweet.userChangeableName} </span></b>
                        <span style={{color: 'gray'}}> @{tweet.userName} </span>
                        <span style={{color: 'gray'}}> · {timeDifferenceString} </span>
                    </div>
                    {currentUserIsAuthor && (
                        <Menu>
                            <MenuButton as={IconButton} className='tweet-options-button' colorScheme='gray'
                                        variant='ghost'
                                        _hover={{border: '1px solid gray', bg: '#1f1f1f'}}
                                        borderRadius='full'
                                        icon={<SettingsIcon size='lg'/>}>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Delete</MenuItem>
                            </MenuList>
                        </Menu>
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
                        <Button isDisabled={toggleLikeLoading}
                                onClick={() => {
                                    setLikeCount(likeCount - 1)
                                    toggleLike()
                                }}>Unlike {likeCount}</Button>
                    )}
                    {!tweetIsLiked && (
                        <Button isDisabled={toggleLikeLoading}
                                onClick={() => {
                                    setLikeCount(likeCount + 1)
                                    toggleLike()
                                }}>Like {likeCount}</Button>
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