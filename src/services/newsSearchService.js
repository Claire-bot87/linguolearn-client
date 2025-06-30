import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL

// export const fetchArticles = async(keyword) =>{
//     try{
//         const res = await axios.get('https://newsapi.org/v2/everything',{
//     params: {
//     q: keyword,
//     language: 'en',
//     pageSize: 10,
//     apiKey: import.meta.env.VITE_NEWSAPI_KEY,  
//         }})
//         return res.data
//     }catch (error) {
//         console.log(error)
//         throw error
//     }
// }



export const fetchArticles = async (keyword) => {
  try {
    const response = await axios.get(BASE_URL + `/api/news?q=${keyword}`);
    return response.data; // "results" is the key in NewsData's response
  } catch (err) {
    console.error('Error fetching news:', err);
  }
};

 