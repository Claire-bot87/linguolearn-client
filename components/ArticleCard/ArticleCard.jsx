import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
//import { useParams } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'

import './ArticleCard.css'



const ArticleCard = ({ article }) => {
    const location = useLocation()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
console.log(article.url)

  const isNewsSearch = location.pathname === '/newssearch';
  const isSingleArticle = location.pathname === `/articles/${article.article_id || article.link}`;


    return (
        <>
{isNewsSearch && (
<Link to={`/articles/${article.article_id || article.link}`}>
            <div className="article-card">
                <div className="for-name-and-image">
                   
                    <h2>{article.title || 'Untitled'}</h2>
                    
                </div>
                <div className="single-child-box">
                    <h5>{article.content || 'No content available'}</h5>
                </div>
                <div className='add-question-container'>
                </div>
             
            </div>
   </Link>
)}
{isSingleArticle && (

            <div className="article-card">
                <div className="for-name-and-image">
                  
                    <h2>{article.title}</h2>
                    
                </div>
                <div className="single-child-box">
                    <h5>{article.content}</h5>
                </div>
                <div className='add-question-container'>
                </div>
             
            </div>

)}
        </>
    )
}

export default ArticleCard