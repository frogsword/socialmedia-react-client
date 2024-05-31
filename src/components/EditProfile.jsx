import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import "../styles/profile-edit.css"

function EditProfile({currentUser}) {
    const profilePicture = ("data:image/jpeg;base64," + currentUser.profilePicture)

    const [pfp, setPfp] = useState(profilePicture);
    const [name, setName] = useState(currentUser.changeableName);
    const [bio, setBio] = useState(currentUser.bio);
    const [country, setCountry] = useState(currentUser.country);
    const fileUploadRef = useRef(null);

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <div className="edit-profile">
            <Button colorScheme='red' variant='outline' borderColor='red'
                    _hover={{border: '1px solid red', bg: '#1f1f1f'}}
                    onClick={onOpen}>
                Edit Profile
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter='blur(10px)'/>
                <ModalContent style={{backgroundColor: 'black', border: '1px solid white'}}>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <div className='modal-body'>
                            <div className='edit-image-container' onClick={() => fileUploadRef.current.click()}>
                                <Avatar size='2xl' src={pfp} className="edit-avatar"/>
                                <div className='edit-image-tag'>
                                    <AddIcon/>
                                </div>
                            </div>

                            <FormControl>
                                <Stack spacing={3}>
                                    <Input type='file' ref={fileUploadRef}
                                           onChange={(e) => setPfp(URL.createObjectURL(e.target.files[0]))}
                                           size='md' hidden/>
                                    <div>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" size='md' value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div>
                                        <FormLabel>About Me</FormLabel>
                                        <Textarea type="text" size='md' value={bio} resize='vertical'
                                                  onChange={(e) => setBio(e.target.value)}/>
                                    </div>
                                    <div>
                                        <FormLabel>Country</FormLabel>
                                        <Input type="text" size='md' value={country}
                                               onChange={(e) => setCountry(e.target.value)}/>
                                    </div>
                                </Stack>
                            </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>

    )
}

export default EditProfile;