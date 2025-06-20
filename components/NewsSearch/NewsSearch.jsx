import React, { useState } from 'react';
import { fetchArticles } from '../../src/services/newsSearchService'
import './NewsSearch.css'


const NewsSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    
    setLoading(true)
    try {
        const data = await fetchArticles(keyword)
      if (data.articles) {
        setArticles(data.articles);
        console.log('ARTICLES' , data.articles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };


//   const handleSave = async (article) => {
//     try {
//       const res = await fetch('/.netlify/functions/saveArticle', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(article),
//       });
//       if (res.ok) {
//         alert('Article saved!');
//       }
//     } catch (err) {
//       console.error('Failed to save:', err);
//     }
//   };

  return (
    <div>
      <h2>Search News Articles</h2>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Enter a topic (e.g. climate, books)"
      />
      <button onClick={getArticles} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: '1em' }}>
            <strong>{article.title}</strong><br />
            <em>{article.source.name}</em><br />
            <p>{article.description}</p>
            <button onClick={() => handleSave(article)}>Save</button>
          </li>
        ))}
      </ul> */}

<div className='articles-div'>
      {/* <h2>{articles}</h2> */}
       <h2>articles</h2>
       </div>


<div className='all-articles'>
        {articles.length > 0 
? articles.map(article => <h3 key={article.title} >{article.title}</h3>)
: <p>There are no articles yet</p>

}
</div>



    </div>
  );
};

export default NewsSearch;
