import {create} from 'zustand'
import AxiosInstan from '../libs/axios'

const authStore = create(()=>({
    getLogin: async (email,password) => {
        try {
           
            const result = await AxiosInstan.post('/auth/login',{
                email,
                password
            })

            console.log(result);

                                                     
        } catch (error) {
                console.log("Error",error),
                alert('Something Went Wrong')
        }
    }
}))


export default authStore