import { Avatar, Image } from "@chakra-ui/react"

function Tweet({ tweet }) {
    return (
        <div key={tweet.id} className="tweet">
            <div>{tweet.body}</div>
            <Avatar size='lg' src={"data:image/jpeg;base64," + tweet.userPfp} border='2px solid gray' />
            <Image height='400px' borderRadius='20px' border='1px solid gray' src={"data:image/jpeg;base64," + tweet.image} />
        </div>
    )
}

export default Tweet