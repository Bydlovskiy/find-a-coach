import http from '../MainAxios'

export default {
    getMessages(id : string) {
        return http.get(`/messages/${id}.json`)
    },
    setMessage(message: any, id : string) {
        return http.post(`/messages/${id}.json`, message)
    }
}