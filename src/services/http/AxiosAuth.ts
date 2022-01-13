import axios from 'axios'

const auth = axios.create({
    headers: {
        accept: 'application/json'
    }
})

export default auth