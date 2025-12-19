import './SignIn.css'
import { useState, useContext } from 'react'
import { signInService } from '../../services/auth'
import { getUserFromToken, setToken } from '../../utils/token'
import { useNavigate, Link } from 'react-router'

// Context
import { UserContext } from '../../contexts/UserContext'

const SignIn = () => {
  // Context
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errorData, setErrorData] = useState({})

  // Location variables
  const navigate = useNavigate()

  // Functions
  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
    setErrorData({ ...errorData, [input.name]: '', message: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send sign in request to the API via the service
      const response = await signInService(formData)

      // Take the token off the response
      const token = response.data.access
      
      // Save the token to localStorage, for permanent access across page loads
      if (token) setToken(token)
      console.log(token)

      // Set the user state with the user found in the token
      setUser(getUserFromToken())

      // Navigate to home page once user is set
      navigate('/')

    } catch (error) {
  if (error.response?.data?.detail) {
    setErrorData({ message: error.response.data.detail })
  } else {
    setErrorData({ message: "Something went wrong" })
  }
}
  }

  return (
    <>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-control">
          <label hidden htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} />
          {errorData.username && <p className='error-message'>{errorData.username}</p>}
        </div>

        <div className="form-control">
          <label hidden htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} />
          {errorData.password && <p className='error-message'>{errorData.password}</p>}
        </div>

        <button className="action-button" type="submit">Sign in</button>

        <p>New here?  <Link to="/sign-up">Create an account</Link></p>

        {errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default SignIn