import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from "@/store/MainStore";
import {authStore} from '@/pages/auth/AuthStore'
import http from '@/services/http/messages/MessagesService'

@Module
class MessagesModule extends VuexModule {
    messages: any = {}

    @Mutation
    saveMessages(data: any) {
        ''
    }

    @Action
    getMessages(id: string) {
        http.getMessages(id).then(response => {
            console.log(response)
        })
    }

    @Action
    setMessage(message: any) {
        const requestData = {message: message.message, email: message.email};
        http.setMessage(requestData , message.coachId)
            .then(response => this.getMessages(message.coachId))
    }

}

export const messagesStore = new MessagesModule({store, name: 'MessagesStore'})
