import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

// export const signup = async(formData) =>{
//     try{
//         const res = await axios.post(BASE_URL + '/auth/signup/', formData, {
//         headers: {
//             'Content-Type': 'application/json', // Make sure this is sent
//           },
//         })
        
//         console.log(res)
//         console.log('Form Data:', formData);

//         return res.data
//     } catch(error) {
//         console.log(error)
//         throw error
//     }
//     }

export const signup = async (formData) => {
    try {
      const res = await axios.post(BASE_URL + '/signup/', formData, 
    //     {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    );
      console.log('Response Object:', res);

      // Log the response data (which should include the token)
      console.log('Response Data:', res.data);
      console.log('Response Headers:', res.headers);
      return res.data;
    } catch (error) {
      console.error('Backend Error:', error.response?.data || error);
      throw error;
    }
  };

  export const signin = async (formData) => {
    try {
        const res = await axios.post(BASE_URL + '/signin/', formData)
        console.log(`💕RES.DATA ${JSON.stringify(res.data)}`)
        return res.data
    } catch (error) {
        throw new error
    }
}

export const userShow = async (userId) => {
  try{
    console.log(`USER ID IN USER SERVICE = ${userId}`)
      const res = await axios.get(BASE_URL + `/users/${userId}`)
      console.log(`child ID = ${userId}`)
      console.log('Response from userShow:', res.data) 
      return res.data
  } catch (error) {
      console.log('Error in userShow:', error)
      throw error
  }
  }