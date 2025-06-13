import { useContext } from 'react'
import TitleComponent from '../../components/TitleComponent/TitleComponent.jsx'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import './Nav.css'
import { getToken, removeToken } from '../../utils/auth'



export default function Nav(){
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const signOut = () => {
        removeToken()
        setUser(null)
        navigate('/')
        // setTimeout(() => navigate('/'), 100)

    }
    return (
        <div className="nav-div">
        <TitleComponent />
        {user && user._id
                ? (
                    <>
                        
                        <button onClick={signOut}className='button'>Sign out</button>
                        <button onClick={() => navigate(`/users/${user._id}`)}className='button'>👤</button>
                        <button onClick={() => navigate(`/users/${user._id}/gotos`)}className='button'>Go Tos 🥗</button>
                    </> 
                )
                : (
                    <>
                        <button onClick={() => navigate('/signin')}className='button'>Sign in</button>
                    </>
                )
            }
        {/* <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link> */}
        </div>
    )
 
}