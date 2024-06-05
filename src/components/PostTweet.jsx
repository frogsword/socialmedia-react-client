import {Button, FormControl, IconButton, Image, Input, Textarea} from "@chakra-ui/react";
import {useRef, useState} from "react";
import "../styles/post-tweet.css"
import {AttachmentIcon, CloseIcon} from "@chakra-ui/icons";

function PostTweet({message, parentId}) {

    const fileUploadRef = useRef(null);

    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [body, setBody] = useState("");

    const [invalid, setInvalid] = useState(true)
    const handleSubmit = async () => {
        const formData = new FormData()

        //dunno if theres a better way
        if (message === "Tweet Something...") {
            if (image !== null) {
                formData.append("image", imageFile, image)
                formData.append("body", body.trim())

                await fetch("http://localhost:8080/api/tweets/create/withimage", {
                    method: "POST",
                    mode: "cors",
                    body: formData,
                    credentials: 'include'
                })
            } else {
                formData.append("body", body)

                await fetch("http://localhost:8080/api/tweets/create/noimage", {
                    method: "POST",
                    mode: "cors",
                    body: formData,
                    credentials: 'include'
                })
            }
        } else if (message === "Reply...") {
            if (image !== null) {
                formData.append("image", imageFile, image)
                formData.append("body", body.trim())

                await fetch(`http://localhost:8080/api/tweets/${parentId}/reply/withimage`, {
                    method: "POST",
                    mode: "cors",
                    body: formData,
                    credentials: 'include'
                })
            } else {
                formData.append("body", body)

                await fetch(`http://localhost:8080/api/tweets/${parentId}/reply/noimage`, {
                    method: "POST",
                    mode: "cors",
                    body: formData,
                    credentials: 'include'
                })
            }
        }

        return window.location.reload()
    }

    const handleChange = (e) => {
        setBody(e)
        if (body.trim().length > 1 || e.trim().length > 1) {
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }

    return (
        <div className="post-tweet-main">
            <div className="right-column">
                <div className="top-row">
                    <FormControl>
                        <Input type='file' ref={fileUploadRef}
                               onChange={(e) => {
                                   if (e.target.files[0].type === "image/jpeg") {
                                       setImage(URL.createObjectURL(e.target.files[0]))
                                       setImageFile(e.target.files[0])
                                       handleChange()
                                   }
                               }}
                               size='md' hidden/>
                        <div>
                            <Textarea type="text"
                                      isRequired
                                      size='lg'
                                      value={body}
                                      resize='vertical'
                                      variant='flushed'
                                      placeholder={message}
                                      _placeholder={{color: "white"}}
                                      onChange={(e) => handleChange(e.target.value)}>
                            </Textarea>
                            <div className='upload-image-container' hidden={(image == null)}>
                                <Image className='upload-image' borderRadius='20px'
                                       src={image}/>
                                <div className='remove-image-tag'>
                                    <CloseIcon onClick={() => {
                                        setImage(null)
                                        setImageFile(null)
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </FormControl>
                </div>

                <div className='bottom-row'>
                    <IconButton aria-label='Upload an Image' variant='ghost' borderRadius='full'
                                isDisabled={(image != null)}
                                onClick={() => fileUploadRef.current.click()}
                                icon={<AttachmentIcon/>}/>

                    <Button colorScheme='blue' mr={3} isDisabled={invalid} borderRadius='full'
                            onClick={() => handleSubmit()}>
                        Publish Tweet
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default PostTweet;