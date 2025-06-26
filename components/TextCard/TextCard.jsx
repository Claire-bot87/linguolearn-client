import { useContext } from 'react'
import { textDelete } from '../../src/services/textService'
import { Link, useNavigate, useLocation } from 'react-router'
//import { useParams } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'

import './TextCard.css'



const TextCard = ({ text }) => {

    const location = useLocation()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    const textId = text.id || text._id; // works with both views

    const isAllTextsPage = location.pathname === '/texts';
    const isSingleTextPage = location.pathname === `/texts/${textId}`;




    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')
        if (confirmDelete) {
            try {
                console.log('child ID IN HANDLE DELETE' + text.id)
                await textDelete(text.id)
                navigate('/texts/')
            } catch (error) {
                // 
            }
        }
    }


    return (
        <>
  {isSingleTextPage && (
            <div className="child-card-large">
                <div className="for-name-and-image">
                    <h2>{text.name}</h2>
                </div>
                <div className="single-child-box">
                    <h5>{text.bodyoftext}</h5>
                </div>
                <div className='add-question-container'>
                    <Link to={`/texts/${text._id}/add`}>
                <div className='add-question-for-text'></div>
                </Link>
                </div>
            </div>
)}

 {isAllTextsPage && (
<Link to={`/texts/${text._id}`}>
            <div className="child-card-large">
                <div className="for-name-and-image">
                    <h2>{text.name}</h2>
                </div>
                <div className="single-child-box">
                    <h5>{text.bodyoftext}</h5>
                </div>
                <div className='add-question-container'>
                </div>
            </div>
</Link>
)}

        </>
    )
}



export default TextCard

