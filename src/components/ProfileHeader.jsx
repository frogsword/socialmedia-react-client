import {Avatar, Icon, Image, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import "../styles/profile-header.css"
import {CalendarIcon} from "@chakra-ui/icons";
import {IoLocationSharp} from "react-icons/io5";
import EditProfile from "./EditProfile.jsx";

function ProfileHeader({profileUser, currentUser}) {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const profilePicture = ("data:image/jpeg;base64," + profileUser.profilePicture)

    const isOwnProfile = currentUser.id === profileUser.id
    const currentUserIsFollowingProfileUser = currentUser.following.includes(profileUser.id)

    return (
        <div className='profile-header'>

            <div className='profile-top-row'>
                <Avatar size='2xl' src={profilePicture}
                        onClick={onOpen}/>
                {(!currentUserIsFollowingProfileUser && !isOwnProfile) && (
                    <button>follow</button>
                )}
                {isOwnProfile && (
                    <EditProfile currentUser={currentUser}/>
                )}
            </div>

            <div className='names-info'>
                <div className='changeable-name'>{profileUser.changeableName}</div>
                <div className='name'>@{profileUser.name}</div>
            </div>

            <div>{profileUser.bio}</div>

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
                    <div>{profileUser.followers.length}</div>
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