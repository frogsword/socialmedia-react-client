import {Button, Icon, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import React from "react";
import {GoTrash} from "react-icons/go";

function TweetOptions({tweetId}) {
    const [deleteLoading, setDeleteLoading] = React.useState(false)
    const handleClick = async () => {
        setDeleteLoading(true)
        await fetch(`http://localhost:8080/api/tweets/${tweetId}/delete`, {
            method: "DELETE",
            mode: "cors",
            credentials: 'include'
        })
            .then(() => setDeleteLoading(false))

        return window.location.reload()
    }

    return (
        <>
            <Menu placement='right'>
                <MenuButton as={Button} colorScheme='blackAlpha' style={{color: "white", borderRadius: "50px"}}
                            _hover={{border: "1px solid white"}}>
                    <b>· · ·</b>
                </MenuButton>
                <MenuList style={{backgroundColor: 'black'}}>
                    <MenuItem style={{backgroundColor: 'black'}}
                              _hover={{border: "1px solid white", backgroundColor: "red"}}>
                        <Button variant='ghost' borderRadius='full' colorScheme='blackAlpha'
                                leftIcon={<Icon as={GoTrash} size="lg" style={{color: "red"}}/>}
                                isDisabled={deleteLoading}
                                style={{border: "none", color: "red", fontSize: "18px"}}
                                onClick={() => {
                                    handleClick()
                                }}>Delete</Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default TweetOptions;