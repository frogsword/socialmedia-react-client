import { useState, useEffect } from "react"

function App() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/api/tweets/user/664a34bcf100de72da456679", {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((res) => setTweets(res))
    }, [])

  return (
    <>
        {tweets.map(function(tweet) {
      return (
        <div key={tweet.id}>
          <div>{tweet.body}</div>
          <img src={"data:image/jpeg;base64," + tweet.image}></img>
        </div>
      )
    })}
    </>
  )
}

export default App
