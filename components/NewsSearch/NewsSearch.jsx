import React, { useState } from 'react';
import { fetchArticles } from '../../src/services/newsSearchService'
import './NewsSearch.css'
import ArticleCard from '../ArticleCard/ArticleCard'


const NewsSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    
    setLoading(true)
    try {
        const data = await fetchArticles(keyword)
      if (data.results) {
        setArticles(data.results);
        localStorage.setItem('articles', JSON.stringify(data.results))
        console.log('ARTICLES' , data.results)
        console.log('NEW CONSOLE LOG🪵')
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }




  return (

    <div className='search'>

      <h2>type in a keyword to search news articles for your student to read</h2>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Enter a topic (e.g. climate, books)"
        onKeyDown={(e)=> {
          if(e.key ==='Enter'){
            getArticles()
          }
        }}
      />
      <button onClick={getArticles} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
<p style={{ fontSize: '0.8rem', color: '#666' }}>
  {/* Powered by <a href="https://newsdata.io/" target="_blank" rel="noopener noreferrer">NewsData.io</a> */}
</p>
 

<div className="all-articles-div">
  {articles.length > 0 ? (
    <div className="articles-grid">
      {articles.map(article => (
        <ArticleCard key={article.article_id || article.link} article={article} />
      ))}
    </div>
  ) : (
    <p>There are no articles yet</p>
  )}
</div>



    </div>
  );
};

export default NewsSearch;
