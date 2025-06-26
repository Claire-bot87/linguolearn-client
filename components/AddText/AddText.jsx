import './AddText.css'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import { textCreate } from '../../src/services/textService'

export default function AddText() {

    const [formData, setFormData] = useState({
        name: '',
        bodyoftext: '',

    })

    const [isUploading, setIsUploading] = useState(false)


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
            const data = await textCreate(formData)
            navigate(`/texts/${data._id}`)

        } catch (error) {
            setErrors(error.response?.data?.errors || {})
        }
    }

    const handleChange = async (e) => {
        setErrors({ ...errors, [e.target.name]: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='add-text-container'>
            <h1>Add Text</h1>
            <form onSubmit={handleSubmit}>
                {/*name*/}
                <div className='form-field'>
                    <label htmlFor='name'>title</label>
                    <input className='input'
                        name='name'
                        id='name'
                        placeholder='add text name'
                        value={formData.name}
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                {/*bodyoftext*/}
                <div className='form-field'>
                    <label htmlFor='name'>content</label>
                    <input
                        className="input"
                        type="text"
                        name="bodyoftext"
                        id="bodyoftext"
                        placeholder="add text"
                        value={formData.bodyoftext}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='button-group'>
          {/* <Link to='/'>Cancel</Link> */}
          <button type='submit' disabled={formData.name === '' || isUploading}>Create</button>
        </div>

            </form>
        </div >
    )


}