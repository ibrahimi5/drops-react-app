import { useState, useContext } from 'react'
import './postCreate.css'
import { postCreate } from '../../services/posts'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const PostCreate = () => {
  // Context
  const { user } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    body: "",
    image: "",
    category: [],
  })
  const [errorData, setErrorData] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Consume the service function (API)
      const { data } = await postCreate(formData)
      console.log("Post created")
      navigate(`/posts/${data._id}`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response.data)
    }
  }


  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return (
    <>
      <h1>What's on your mind?</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label hidden htmlFor="body">Title</label>
          <textarea type="text" name="body" id="body" placeholder='Body' required value={formData.body} onChange={handleChange}></textarea>
          { errorData.title && <p className='error-message'>{errorData.title}</p>}
        </div>

        <div className="form-control">
          <label hidden htmlFor="image">image</label>
          <input name="image" id="image" placeholder="image" value={formData.image} accept="image/*" onChange={handleChange}/>
          { errorData.text && <p className='error-message'>{errorData.image}</p>}
        </div>

        <div className="form-control">
          <label hidden htmlFor="category">Category</label>
          <select name="category" id="category" required value={formData.category} onChange={handleChange}>
            <option value={categories[0]}>Sports</option>
            <option value={categories[1]}>Music</option>
            <option value={categories[2]}>People</option>
            <option value={categories[3]}>Games</option>
            <option value={categories[4]}>Politics</option>
          </select>
          { errorData.category && <p className='error-message'>{errorData.category}</p>}
        </div>

        <button type="submit">Create post</button>

        { errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default PostCreate