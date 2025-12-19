import "./PostsByCategories.css"
import { useState, useEffect } from 'react'
import { postByCategories } from '../../services/categories'
import { Link, useParams } from 'react-router'
import { UserContext } from "../../contexts/UserContext"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


const PostsByCategories = () => {
  
  const [posts, setPosts] = useState([])
  const [errorData, setErrorData] = useState({})
  
  dayjs.extend(relativeTime);
  const { categoryId } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await postByCategories(categoryId)
        setPosts(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response.data)
      }
    }
    getData()
  }, [])



  return (
    <>
      <h1>Category</h1>
      { errorData.message
        ? <p className='error-message'>{errorData.message}</p>
          : posts.map(post => {
              return (
                <div key={post.id} className='post-card'>
                  <Link to={`/posts/${post.id}`}>
                    <div className="post-header">
                        <p className="post-username">{post.owner.username}</p>
                        <p className="post-date">
                            {dayjs(post.created_at).fromNow()}
                        </p>
                    </div>
                    <p className="post-body">
                      {post.body.length > 1000
                        ? `${post.body.slice(0, 1000)}...`
                        : post.body}
                    </p>

                  </Link>
                </div>
              )
            })
      }
    </>
  )
}

export default PostsByCategories