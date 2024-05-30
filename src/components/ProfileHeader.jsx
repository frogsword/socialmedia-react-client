import {Avatar, Image, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react"

function ProfileHeader({profileUser}) {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const profilePicture = ("data:image/jpeg;base64," + profileUser.profilePicture)

    return (
        <div className='profile-header'>

            <Avatar size='2xl' src={profilePicture}
                    border='3px solid black'
                    onClick={onOpen}/>

            <div className='names-info'>
                <div>{profileUser.changeableName}</div>
                <div>@{profileUser.name}</div>
            </div>

            <div>{profileUser.bio}</div>

            <div className='date-location-info'>
                <div>Joined: {profileUser.registrationDate.slice(0, 10)}</div>
                <div>Country: {profileUser.country}</div>
            </div>

            <div className='follow-info'>
                <div>{profileUser.following.length} following</div>
                <div>{profileUser.followers.length} followers</div>
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