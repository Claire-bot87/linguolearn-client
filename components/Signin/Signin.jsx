import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
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
  
  
      const navigate = useNavigate();

      const { user } = useContext(UserContext)

      useEffect(() => {
        if (user) {
          navigate(`/users/${user._id}`);
        }
      }, [user, navigate]);
  
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
navigate(`/users/${newUser._id}`)
      } catch (error) {
      //   setErrors(error.response.data.errors)
        setErrors(error.message)
      }
    }

   
  
  
    const handleChange = (e) => {
      //console.dir(e.target)
      setErrors({ ...errors, [e.target.name]: '' })
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    return (
      <section className='container-box'>
        <div className="container">
             
        
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
            <input className="input"
              type="password"
              name="password" 
              id="password"
              placeholder="Enter a password"
              required
              onChange={handleChange}
            />
            { errors.password && <p className='error-message'>{errors.password}</p> }
          </div>
  
  
              <button 
    disabled={!formData.password} 
    type="submit" 
    className="button"
  >
    Submit
  </button>
  
        </form>
  
  
        <Button onClick={() => navigate('/signup')} variant='warning'>Don't have an account yet? Sign up here!</Button>
        </div>
      </section>
    )
  }