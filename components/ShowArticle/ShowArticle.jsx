import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'
import { useState, useEffect } from 'react'
import './ShowArticle.css'
import '../../src/App.css'
import { questionIndex } from '../../src/services/questionService'
import { textCreate } from '../../src/services/textService'
import { useParams } from 'react-router'
import { UserContext } from '../../src/contexts/UserContext'
import { useNavigate } from 'react-router'

export default function ShowArticle() {

    const { user } = useContext(UserContext)
const navigate = useNavigate()

  const { encodedUrl } = useParams();
  const articleUrl = decodeURIComponent(encodedUrl)

  // State
 const [article, setArticle] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [formData, setFormData] = useState({
        name: '',
        bodyoftext: '',

    })
 
   useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    }, [user, navigate])

 useEffect(() => {
    // If you're storing articles in localStorage or global state, fetch from there
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || []

    const foundArticle = storedArticles.find(a => a.url === articleUrl)

    if (foundArticle) {
      setArticle(foundArticle)
    } else {
      setError('Article not found.')
    }

    setIsLoading(false)
  }, [articleUrl])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
  
    <>
    
      <div className='space'></div>
      <div className="background">
      <div className="articlecard-div">
        {article && <ArticleCard article={article}  />}
      </div>
    
      {article && (
       

       <button onClick={()=>addArticleToTexts(article)}>add to texts</button>
      )}
      </div>
    </>
    
  )
}