import {Avatar, Button, Icon, Image, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import "../styles/profile-header.css"
import {CalendarIcon} from "@chakra-ui/icons";
import {IoLocationSharp} from "react-icons/io5";
import EditProfile from "./EditProfile.jsx";
import {useState} from "react";

function ProfileHeader({profileUser, currentUser}) {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const profilePicture = ("data:image/jpeg;base64," + profileUser.profilePicture)

    const isOwnProfile = currentUser.id === profileUser.id
    const [currentUserIsFollowingProfileUser, setCurrentUserIsFollowingProfileUser] = useState(currentUser.following.includes(profileUser.id))

    const [followerCount, setFollowerCount] = useState(profileUser.followers.length);
    const [followLoading, setFollowLoading] = useState(false);

    const handleFollowClick = async () => {
        await fetch(`http://localhost:8080/api/users/${profileUser.id}/follow`, {
            method: "PUT",
            mode: "cors",
            credentials: 'include'
        })
            .then(() => setCurrentUserIsFollowingProfileUser(!currentUserIsFollowingProfileUser))
            .then(() => setFollowLoading(false))
    }

    return (
        <div className='profile-header'>

            <div className='profile-top-row'>
                <Avatar size='2xl' src={profilePicture} className='profile-header-avatar'
                        onClick={onOpen}/>
                {(!currentUserIsFollowingProfileUser && !isOwnProfile) && (
                    <Button colorScheme='blue' variant='solid' isDisabled={followLoading}
                            onClick={() => {
                                setFollowLoading(true)
                                setFollowerCount(followerCount + 1);
                                handleFollowClick();
                            }}>
                        Follow
                    </Button>
                )}
                {(currentUserIsFollowingProfileUser && !isOwnProfile) && (
                    <Button colorScheme='red' variant='outline' isDisabled={followLoading}
                            onClick={() => {
                                setFollowLoading(true)
                                setFollowerCount(followerCount - 1);
                                handleFollowClick();
                            }}>
                        Unfollow
                    </Button>
                )}
                {isOwnProfile && (
                    <EditProfile currentUser={currentUser}/>
                )}
            </div>

            <div className='names-info'>
                <div className='changeable-name'>{profileUser.changeableName}</div>
                <div className='name'>@{profileUser.name}</div>
            </div>

            <div className='bio'>{profileUser.bio}</div>

            <div className='date-location-info'>
                <div>
                    <Icon as={IoLocationSharp}/>
                    <div>{profileUser.country}</div>
                </div>
                <div>
                    <CalendarIcon/>
                    <div>{profileUser.registrationDate.slice(0, 10)}</div>
                </div>
            </div>

            <div className='follow-info'>
                <div>
                    <div>{profileUser.following.length}</div>
                    <div className='follow-text'>following</div>
                </div>
                <div>
                    <div>{followerCount}</div>
                    <div className='follow-text'>followers</div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
                <ModalOverlay backdropFilter='blur(10px)'/>
                <ModalContent borderRadius='full'>
                    <Image height='500px' borderRadius='full'
                           src={profilePicture}/>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default ProfileHeader