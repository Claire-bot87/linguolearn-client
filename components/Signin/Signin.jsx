import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import { signin } from '../../src/services/userService'
import { setToken } from '../../utils/auth.js'
import { getUserFromToken } from '../../utils/auth.js'
import { UserContext } from '../../src/contexts/UserContext'
import './Signin.css';
import { Button } from 'react-bootstrap'


export default function Signin(){




    const { setUser } = useContext(UserContext)

    // State
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
    })
    const [errors, setErrors] = useState({})

  const [showPassword, setShowPassword] = useState(false)

      const location = useLocation()
      const navigate = useNavigate();
      const from = location.state?.from || '/'
      const { user } = useContext(UserContext)

     useEffect(() => {
  if (user && !location.state?.from) {
    navigate(`/`);
  }
}, [user, navigate, location.state?.from])
  
    // Events
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const data = await signin(formData)
        console.log(`DATA${data._id}`)
        setToken(data.token)

      //   setUser(getUserFromToken())
      //   console.log(`🌸 USER${user._id}`)

     
      // navigate(`/users/${user._id}`)
      const newUser = getUserFromToken()
setUser(newUser)
// navigate(`/users/${newUser._id}`)
navigate(from)
      } catch (error) {
        console.error(error)
        const message = error.response?.data?.message
        if (message) {
    setErrors({ general: message })
      //setErrors(error.response?.data?.errors || {})
        //setErrors(error.message)
      }
    }}

   
  
  
    const handleChange = (e) => {
      //console.dir(e.target)
      setErrors({ ...errors, [e.target.name]: '' })
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    return (
      <section className='container-box'>
        <div className="container">
             <div className='signin-message-div'>
              <h1>Please sign in to continue with LinguoLearn</h1>
             </div>
        
        <h1>Sign in</h1>
       
        
        <form onSubmit={handleSubmit}>
  
          {/* Username */}
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input className="input"
              type="text"
              name="identifier" 
              id="identifier"
              placeholder="Enter your username"
              required
              onChange={handleChange}
            />
            { errors.username && <p className='error-message'>{errors.username}</p> }
          </div>
  
          {/* Password */}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
            <input className="input"
              type={showPassword ? 'text' : 'password'}
              name="password" 
              id="password"
              placeholder="Enter a password"
              required
              onChange={handleChange}
            />
  <span
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
    style={{ cursor: 'pointer', marginLeft: '8px' }}
    title={showPassword ? 'Hide password' : 'Show password'}
  >
    {showPassword ? '🙈' : '👁️'}
  </span>

            </div>
            { errors.password && <p className='error-message'>{errors.password}</p> }
          </div>
  { errors.general && <p className="error-message">{errors.general}</p> }
  
  
              <button 
    disabled={!formData.password} 
    type="submit" 
    className="button"
  >
    Submit
  </button>
  
        </form>
   <Link to="/signup" state={{ from }}>
    <Button variant='warning'>Don't have an account yet? Sign up here!</Button>
        </Link>
        </div>
      </section>
    )
    }