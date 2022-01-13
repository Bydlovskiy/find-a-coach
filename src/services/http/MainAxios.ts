import axios from 'axios'

const http = axios.create({
    baseURL: "https://find-a-coach-702be-default-rtdb.europe-west1.firebasedatabase.app",
    headers: {
        accept: 'application/json'
    }
})

export default http

