import axios from "axios"


export const fetchArticles = async(keyword) =>{
    try{
        const res = await axios.get('https://newsapi.org/v2/everything',{
    params: {
    q: keyword,
    language: 'en',
    pageSize: 10,
    apiKey: import.meta.env.VITE_NEWSAPI_KEY,  
        }})
        return res.data
    }catch (error) {
        console.log(error)
        throw error
    }
}




 