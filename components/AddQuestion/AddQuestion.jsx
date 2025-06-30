import './AddQuestion.css'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link, useLocation} from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import { questionCreate } from '../../src/services/questionService'
import AllQuestions from '../../components/AllQuestions/AllQuestions.jsx'
import { textShow } from '../../src/services/textService'
import { questionIndex } from '../../src/services/questionService'

export default function AddQuestion() {

    const [questionData, setQuestionData] = useState({
        content: ""
    })

    const [isUploading, setIsUploading] = useState(false)

 
 const { textId } = useParams()
    const { user } = useContext(UserContext)

    const navigate = useNavigate()
const location = useLocation()
    const [text, setText] = useState(null)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState('')
    const [error, setError] = useState('')

    const [questions, setQuestions] = useState([])

const fetchQuestions = async () => {
  try {
    const data = await questionIndex()
    const filtered = data.filter(q => q.questiontext === textId)
    setQuestions(filtered)
  } catch (err) {
    console.error(err)
  }
}

// useEffect(() => {
//   fetchQuestions()
// }, [])


    useEffect(() => {
        if (!user) {
            navigate('/signin', { state: { from: location.pathname } })
        }
    }, [user, navigate])

      useEffect(() => {
        console.log(`BISCUIT ID = ${textId}`)
        async function getText() {
          try {
            const data = await textShow(textId)
            console.log(`CHILD ID = ${textId}`)
            console.log("👶 CHILD DATA:", data)
            setText(data)
            fetchQuestions()
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


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await questionCreate(textId, questionData)
            setQuestionData({content:''})
            fetchQuestions()
        } catch (error) {
            setErrors(error.response?.data?.errors || {})
        }
    }

    const handleChange = async (e) => {
        setErrors({ ...errors, [e.target.name]: '' })
        setQuestionData({ ...questionData, [e.target.name]: e.target.value })
    }


    return (
        <section className='add-text-container'>
            <h1>Add question</h1>
            <form onSubmit={handleSubmit}>
                {/*name*/}
                <div className='form-field'>
                    <label htmlFor='content'>question:</label>
                    <input className='input'
                        name='content'
                        id='content'
                        placeholder='add text name'
                        value={questionData.content}
                        onChange={handleChange}
                        required>
                    </input>
                </div>

              

                <div className='button-group'>
          {/* <Link to='/'>Cancel</Link> */}
          <button type='submit' disabled={questionData.content === '' || isUploading}>Create</button>
        </div>

            </form>
<div className='questions-list'>
            <h2>{questionData.content}</h2>
            <div className='all-questions'>
          {text && < AllQuestions text = {text} questions={questions} />}
          </div>
          {text && (
          <Link to={`/texts/${text._id}`}>
             <button className="button" id="add-like" >add Questions</button>
     </Link>
          )}
            </div>
        </section >
    )
}