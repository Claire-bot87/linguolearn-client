import { useParams, useNavigate } from 'react-router'
import TextCard from '../../components/TextCard/TextCard.jsx'
import AllQuestions from '../../components/AllQuestions/AllQuestions.jsx'
import { useContext } from 'react'
import { UserContext } from '../../src/contexts/UserContext'
import { useState, useEffect } from 'react'
import { textShow } from '../../src/services/textService'
import './SingleText.css'
import '../../src/App.css'
import { questionIndex } from '../../src/services/questionService'


export default function SingleText() {

  // State
  const [text, setText] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState('')
 

  // Location variables
  const { textId } = useParams()
  const navigate = useNavigate()

  const [allFoodItems, setAllFoodItems] = useState([])

  const [questions, setQuestions]= useState ([])
    //const { textId } = useParams()
    useEffect(() => {
      console.log(' 💕 TEXT ID' + text?._id)
    questionIndex()
     .then(data => setQuestions(data))
    
    .catch(err => console.log(err))
    }, [])

  useEffect(() => {
    console.log(`BISCUIT ID = ${textId}`)
    async function getText() {
      try {
        const data = await textShow(textId)
        console.log(`CHILD ID = ${textId}`)
        console.log("👶 CHILD DATA:", data)
        setText(data)
      } catch (error) {
        if (error.status === 400) {
          setError('Text not found.')
        } else {
          setError(error.response.data.message)
        }

      } finally {
        setIsLoading(false)
      }
    }
    getText()
  }, [textId])


  return (
    <>
      <div className='space'></div>
      <div className="background">
      <div className="textcard-div">
        {text && <TextCard text={text}  />}
      </div>
      <div className="allquestions-div">
    {text && < AllQuestions text = {text} questions = {questions} />}
    </div>
      </div>
    </>
  )
}