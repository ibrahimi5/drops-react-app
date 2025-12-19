import { useState } from 'react'
import './SignUp.css'
import { signUpService } from '../../services/auth'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  })
  const [errorData, setErrorData] = useState({})
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorData({ ...errorData, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      await signUpService(formData)

      
    navigate('/sign-in')
    } catch (error) {
      if (error.response.status === 500) {
        setErrorData({ message: 'An error has occurred. Please try again later' })
      } else {
        setErrorData(error.response.data)
      }
    }
  }

  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-control">
          <label hidden htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder='Username' onChange={handleChange} required />
          { errorData.username && <p className='error-message'>{errorData.username}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder='Email' onChange={handleChange} required />
          { errorData.email && <p className='error-message'>{errorData.email}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange} required />
          { errorData.password && <p className='error-message'>{errorData.password}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="confirm_password">Type your password in again</label>
          <input type="password" name="confirm_password" id="confirm_password" placeholder='Type your password in again' onChange={handleChange} required />
          { errorData.confirm_password && <p className='error-message'>{errorData.confirm_password}</p> }
        </div>

        <button className="action-button" type="submit">Create account</button>

        {errorData.message && <p className='error-message'>{errorData.message}</p> }
      </form>
    </>
  )
}

export default SignUp