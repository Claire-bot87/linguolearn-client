
import { UserContext } from '../../src/contexts/UserContext'
import { useState, useEffect } from 'react'
import { questionIndex } from '../../src/services/questionService'
//import TextCard from '../TextCard/TextCard'
import { Link } from 'react-router'
import { useParams } from 'react-router'

import './AllQuestions.css'
import '../../src/App.css'

export default function AllQuestions({ text, questions }){

    return (
    <article className="alltexts-article">


<div className='textContainer'>
  {questions.length > 0 ? (
    questions
    .filter(q => q.questiontext === text._id)
    .map(q => <h3 key={q._id}>{q.content}</h3>)
      ) : (
    <p>There are no questions yet</p>
  )}
</div>

</article>
    )
}