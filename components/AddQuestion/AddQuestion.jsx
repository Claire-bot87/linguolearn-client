import './AddQuestion.css'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import { questionCreate } from '../../src/services/questionService'
import AllQuestions from '../../components/AllQuestions/AllQuestions.jsx'
import { textShow } from '../../src/services/textService'

export default function AddQuestion() {

    const [questionData, setQuestionData] = useState({
        content: ""
    })

    const [isUploading, setIsUploading] = useState(false)

 
 const { textId } = useParams()
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const [text, setText] = useState(null)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/signin')
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
            // navigate(`/texts/${data.questiontext}`)

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
            <h1>Add Text</h1>
            <form onSubmit={handleSubmit}>
                {/*name*/}
                <div className='form-field'>
                    <label htmlFor='content'>content</label>
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
          {text && < AllQuestions text = {text} />}
          </div>
          {text && (
          <Link to={`/texts/${text._id}`}>
             <button className="button" id="add-like" ></button>
     </Link>
          )}
            </div>
        </section >
    )
}