
import { UserContext } from '../../src/contexts/UserContext'
import { useState, useEffect } from 'react'
import { textIndex } from '../../src/services/textService'
import TextCard from '../TextCard/TextCard'
import { Link } from 'react-router'

import './AllTexts.css'
import '../../src/App.css'

export default function AllTexts(){
 
    const [texts, setTexts]= useState ([])
   
    
    useEffect(() => {
    textIndex()
     .then(data => setTexts(data))
    
    .catch(err => console.log(err))
    }, [])


  

    return (
    <article className="allfooditems-article">


        {/* {texts.length > 0 
? texts.map(text => <h2>{text.name}</h2>)
: <p>There are no foodItems yet</p>

} */}
<div className='textContainer'>
        {texts.length > 0 
? texts.map(text => <TextCard key={text._id} text={text}  />)
: <p>There are no foodItems yet</p>

}
</div>

{/* <div className='textContainer'>
        {texts.length > 0 
? texts.map(text => <TextCard key={text._id} text={text}  />)
: <p>There are no foodItems yet</p>

}
</div> */}
   {/* <h2>{texts.name}</h2> */}

   {/* <TextCard text={text}  /> */}

</article>
    )
}