import "./PostShow.css"
import { useState, useEffect , useContext} from 'react'
import {postShow } from '../../services/posts'
import { Link,useParams } from 'react-router'
import { UserContext } from "../../contexts/UserContext"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from '../Comments/Comments'

const PostShow = () => {
  const [post, setPost] = useState([])
  const [errorData, setErrorData] = useState({})
  
  dayjs.extend(relativeTime);
  const { postId } = useParams()
  const { user} = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await postShow(postId)
        setPost(data)
      } catch (error) {
        //console.log(error)
        setErrorData(error.response.data)
        console.log(error.response.data)
      }
    }
    getData()
  }, [])

  const createdAt = new Date(post.created_at)

  const date = createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })

  const time = createdAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  })
  

  const authorised = () => {
    if (user.id === post?.owner?.id) {
      return true
    } else {return false}

  }

  return (
  <>
    <h1>Drop</h1>

    {errorData.message ? (
      <p className="error-message">{errorData.message}</p>
    ) : (
      <>
        {authorised() && (
          <div id="buttons-container">
            <button className="action-button" id="edit-button" >Edit</button>
            <button className="action-button" id="delete-button" >Delete</button>
          </div>
        )}

        <div id="post-show" className="post-card">
          <div className="post-header">
            <p className="post-username">
              {post?.owner?.username}
            </p>
            <p className="post-timeAgo">
              {dayjs(post.created_at).fromNow()}
            </p>
          </div>

          <p className="post-body">{post.body}</p>

          <div id="date-time">
            <p id="time">{time}</p>
            <p id="date">{date}</p>
          </div>
        </div>
      </>
    )}

    <Comments
      postId={postId}
      comments={post.comments || []}
    />
  </>
)
}

export default PostShow