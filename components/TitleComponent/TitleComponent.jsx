import './TitleComponent.css';
import { Link } from 'react-router'

const TitleComponent = () => {
  return (

    <Link to='/'>
  <div className="title-div">
    <h1>LinguoLearn</h1>
    <h4>Search English articles to practice language activation!</h4>
    </div>
    </Link>
  )
}

export default TitleComponent;  