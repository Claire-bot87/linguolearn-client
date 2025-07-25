import axios from "axios"
import { getToken }  from "../../utils/auth"

const BASE_URL = import.meta.env.VITE_API_URL + '/texts'

export const textIndex = async() => {
    try{
        const res = await axios.get(BASE_URL)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
    }


export const textShow = async (textId) => {
    try{
        const res = await axios.get(BASE_URL + `/${textId}`)
        console.log(`text ID = ${textId}`)
        console.log('Response from textShow:', res.data) 
        return res.data
    } catch (error) {
        console.log('Error in textShow:', error)
        throw error
    }
    }




// export const textCreate = async (formData) => {
//     console.log('text CREATE text SERVICE')
//     console.log('FORMDATA📈', formData)
//     // eslint-disable-next-line no-useless-catch
//     try {
//         const res = await axios.post(`${BASE_URL}/`, formData,{
//             headers: {
//             Authorization: `Bearer ${getToken()}`,
//             'Content-Type': 'application/json',
        
//         }})
//         console.log('RES',res)
//     } catch(error) {
//     throw error
//     }
//     }

export const textCreate = async (formData) => {
  console.log('FORMDATA📈', formData)

  try {
    const res = await axios.post(`${BASE_URL}/`, formData, {
      headers: {
        'Content-Type': 'application/json',  // ✅ uncomment this!
        Authorization: `Bearer ${getToken()}`
      }
    })
    return res.data
  } catch (error) {
    console.error('❌ Error creating text:', error.response?.data || error.message)
    throw error
  }
}



    export const textUpdate = async(textId, formData) => {

        // eslint-disable-next-line no-useless-catch
        try {
            const res = await axios.put(`${BASE_URL}/${textId}/`, formData, {
                headers: {
                Authorization: `Bearer ${getToken()}`,
         
            }})
return res.data
    }catch(error) {
        throw error
    }
    }


    export const textDelete = async(textId) => {

        // eslint-disable-next-line no-useless-catch
        try {
            console.log(`text ID IN SERVICE ${textId}`)
            const res = await axios.delete(`${BASE_URL}/${textId}/`,{
                headers: {
                Authorization: `Bearer ${getToken()}`,
        }})
    return res.data  
}catch(error) {
    throw error
}
}




export const addtextLike = async (textId, foodItemId) => {
    try {
      const res = await axios.put(`${BASE_URL}/${textId}/likes`,
        { foodItemId }, 
        {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  export const addtextDislike = async (textId, foodItemId) => {
    try {
      const res = await axios.put(`${BASE_URL}/${textId}/dislikes`,
        { foodItemId }, 
        {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }