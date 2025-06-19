import {Routes, Route } from 'react-router'
import Signup from '../components/Signup/Signup'
import Signin from '../components/Signin/Signin'
import AddText from '../components/AddText/AddText'
import AllTexts from '../components/AllTexts/AllTexts'
import Home from '../components/Home/Home'
import Nav from '../components/Nav/Nav'
import SingleText from '../components/SingleText/SingleText'
// import UpdateText from '../components/UpdateText/UpdateText'
import AddQuestion from '../components/AddQuestion/AddQuestion'
//import AllQuestions from '../components/AllQuestions/AllQuestions'
import TitleComponent from '../components/TitleComponent/TitleComponent.jsx'

function App() {
 

  return (
    <>
<div className='home'>
  <div className='nav-div'>
<Nav />
</div>
       {/* <TitleComponent /> */}
<Routes>
<Route path='/signup' element={<Signup/>} />
<Route path='/signin' element={<Signin/>} />
<Route path='/texts/add' element={<AddText/>} />
<Route path='/texts' element={<AllTexts/>} />
<Route path='/' element={<Home/>} />
<Route path='/texts/:textId' element={<SingleText/>} />
{/* <Route path='/texts/:textId/edit' element={<UpdateText/>} />  */}
<Route path='/texts/:textId/add' element={<AddQuestion/>} />
{/* <Route path='/questions' element={<AllQuestions/>} /> */}
</Routes>
</div>
    </>
  )
}

export default App
