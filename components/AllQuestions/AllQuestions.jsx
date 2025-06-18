
import { UserContext } from '../../src/contexts/UserContext'
import { useState, useEffect } from 'react'
import { questionIndex } from '../../src/services/questionService'
//import TextCard from '../TextCard/TextCard'
import { Link } from 'react-router'
import { useParams } from 'react-router'

import './AllQuestions.css'
import '../../src/App.css'

export default function AllQuestions({ text }){
 
    const [questions, setQuestions]= useState ([])
    //const { textId } = useParams()
   
    
    useEffect(() => {
      console.log(' 💕 TEXT ID' + text?._id)
    questionIndex()
     .then(data => setQuestions(data))
    
    .catch(err => console.log(err))
    }, [])


  

    return (
    <article className="allfooditems-article">


<div className='textContainer'>
  {questions.length > 0 ? (
    questions.map(question =>
      question.questiontext === text._id ? (
        <h4 key={question._id}>{question.content}</h4>
      ) : null
    )
  ) : (
    <p>There are no questions yet</p>
  )}
</div>

</article>
    )
}