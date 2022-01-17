import http from '../MainAxios'

import {authStore} from "@/pages/auth/AuthStore";

class MessagesService {

    getMessages(id : string) {
        return http.get(`/messages/${id}.json?auth=${authStore.userData.token}`)
    }

    setMessage(message: any, id : string) {
        return http.post(`/messages/${id}.json`, message)
    }
}

export const messagesService = new MessagesService()