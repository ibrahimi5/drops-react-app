import { useState, useContext } from 'react'
import './PostCreate.css'
import { postCreate } from '../../services/posts'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const PostCreate = () => {
  // Context
  const { user } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    body: "",
    // image: "",
    category: "1",
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
      navigate(`/`)
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
      <h1>Create post</h1>
      <form className="create-update" onSubmit={handleSubmit}>
        <div className="form-control">
          <label hidden htmlFor="body">Body</label>
          <textarea type="text" name="body" id="body" placeholder='Body' required value={formData.body} onChange={handleChange}></textarea>
          { errorData.body && <p className='error-message'>{errorData.body}</p>}
        </div>

        {/* <div className="form-control">
          <label hidden htmlFor="image">image</label>
          <input name="image" id="image" type="file" placeholder="image"  accept="image/*" onChange={handleChange}/>
          {formData.image && (<img src={formData.image} alt="preview" width="200" />)}
          { errorData.image && <p className='error-message'>{errorData.image}</p>}
        </div> */}

        <div className="form-control">
          <label  htmlFor="category">Category </label>
          <select name="category" id="category" required value={formData.category} onChange={(e) => setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })}>
            <option value="1" >Sports</option>
            <option value="2" >Music</option>
            <option value="3" >People</option>
            <option value="4" >Games</option>
            <option value="5" >Politics</option>
          </select>
          { errorData.category && <p className='error-message'>{errorData.category}</p>}
        </div>

        <button className="action-button" type="submit">Create post</button>

        { errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default PostCreate