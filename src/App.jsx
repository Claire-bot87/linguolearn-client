import {Routes, Route } from 'react-router'
import Signup from '../components/Signup/Signup'
import Signin from '../components/Signin/Signin'
import AddText from '../components/AddText/AddText'
import AllTexts from '../components/AllTexts/AllTexts'
// import Home from '../components/Home/Home'
// import Nav from '../components/Nav/Nav'
import SingleText from '../components/SingleText/SingleText'
// import UpdateText from '../components/UpdateText/UpdateText'

function App() {
 

  return (
    <>
<h1>Hello World</h1>
{/* <Nav /> */}
<Routes>
<Route path='/signup' element={<Signup/>} />
<Route path='/signin' element={<Signin/>} />
<Route path='/texts/add' element={<AddText/>} />
<Route path='/texts' element={<AllTexts/>} />
{/* <Route path='/' element={<Home/>} /> */}
<Route path='/texts/:textId' element={<SingleText/>} />
{/* <Route path='/texts/:textId/edit' element={<UpdateText/>} />  */}

</Routes>

    </>
  )
}

export default App
