import axios from 'axios'

const http = axios.create({
    baseURL: 'https://vue-http-66884-default-rtdb.europe-west1.firebasedatabase.app/survey.json',
    headers: {
        'Content-Type': 'application/json'
    }
})
export default http