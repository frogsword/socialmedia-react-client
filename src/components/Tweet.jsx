import {Avatar, Image, Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import {Link} from "react-router-dom";

function Tweet({tweet}) {

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <div id={tweet.id} className="tweet">
            <div>{tweet.body}</div>

            <Link to={`/profile/${tweet.userName}`}>
                <Avatar size='lg' src={"data:image/jpeg;base64," + tweet.userPfp} border='2px solid gray'/>
            </Link>

            <Image height='350px' borderRadius='20px' border='1px solid gray' onClick={onOpen}
                   src={"data:image/jpeg;base64," + tweet.image}/>


            <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
                <ModalOverlay backdropFilter='blur(10px)'/>
                <ModalContent>
                    <Image borderRadius='10px'
                           src={"data:image/jpeg;base64," + tweet.image}/>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Tweet