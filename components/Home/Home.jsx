import './Home.css'
import { useNavigate } from 'react-router'

export default function Home(){

   const navigate = useNavigate()

    return (


<div className='home-container'>
{/* <h1 className='role'> Sign up to get started</h1> */}
<div className='hero-div-container'>
<div className='hero-div'></div>
</div>
<button onClick={() => navigate(`/newssearch`)}className='get-started-button'>Click here to get started</button>
</div>

    )}
