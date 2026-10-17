import axios from 'axios'

const AxiosInstan = axios.create({
     baseURL: "http://localhost:3000",
     adapter:"fetch"
})

export default AxiosInstan