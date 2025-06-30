
import {useState} from 'react'
import { useNavigate, useLocation } from 'react-router'
import {signup} from '../../src/services/userService'
import {UserContext} from '../../src/contexts/UserContext'
import './Signup.css';

export default function Signup(){

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password_confirmation:''
  })

    const [errors, setErrors] = useState({})

const [showPassword, setShowPassword] = useState(false)
const [showConfPassword, setShowConfPassword] = useState(false)

     const navigate = useNavigate()
const location = useLocation()
const from = location.state?.from || '/'
    const handleSubmit = async (e) => {
       
     e.preventDefault()
        console.log('SIGNING UP')
        console.log((formData))
        try {
            await signup(formData)
           
            navigate('/signin', { state: { from } })
            // navigate(from)
        }catch(error){
            console.error(error)
            setErrors(error.response?.data?.errors || {})
        }
    }

    const handleChange = (e) => {
        setErrors({...errors,[e.target.name]:''})
        setFormData({...formData, [e.target.name]: e.target.value})
    }

return(
  <section className='container-box'>
    <div className ='container'>
 <div className='signup-message-div'>
              <h1>Please sign up to continue with LinguoLearn</h1>
             </div>
<h1>Signup</h1>
<p className="signup">You are creating an account</p>

<form onSubmit = {handleSubmit} >

<div className="form-control">
          <label htmlFor="username">Username</label>
          <input className="input"
            type="text"
            name="username" 
            id="username"
            placeholder="Enter a username"
            required
            onChange={handleChange}
          />
          { errors.username && <p className='error-message'>{errors.username}</p> }
        </div>


<div className="form-control">
          <label htmlFor="email">Email</label>
          <input className="input"
            type="email"
            name="email" 
            id="email"
            placeholder="Enter an email address"
            required
            onChange={handleChange}
          />
          { errors.email && <p className='error-message'>{errors.email}</p> }
        </div>

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


        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="password-wrapper1">
          <input className="input"
            type={showConfPassword ? 'text' : 'password'}
            name="password_confirmation" 
            id="password_confirmation"
            placeholder="Re-type the password"
            required
            onChange={handleChange}
          />
  <span
    className="toggle-password"
    onClick={() => setShowConfPassword(!showConfPassword)}
    style={{ cursor: 'pointer', marginLeft: '8px' }}
    title={showConfPassword ? 'Hide password' : 'Show password'}
  >
    {showConfPassword ? '🙈' : '👁️'}
  </span>

          </div>
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword &&
  <p className='error-message'>Passwords do not match</p>
}
        </div>


<button 
 type='submit'> Submit </button>




</form>




    </div>
    </section>
)

}