import axios from 'axios'

const AxiosInstan = axios.create({
     baseURL: "http://localhost:3000",
     adapter:"fetch",
      withCredentials: true,
})

export default AxiosInstan