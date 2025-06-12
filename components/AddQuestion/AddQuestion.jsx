import './AddQuestion.css'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import { questionCreate } from '../../src/services/questionService'

export default function AddQuestion() {

    const [questionData, setQuestionData] = useState({
        content: ""
    })

    const [isUploading, setIsUploading] = useState(false)

 const { textId } = useParams()
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    }, [user, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await questionCreate(textId, questionData)
            navigate(`/texts/${data._id}`)

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
        </section >
    )
}