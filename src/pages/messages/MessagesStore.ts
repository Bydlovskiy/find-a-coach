import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'

import {store} from "@/store/MainStore";

import { messagesService } from '@/services/http'

@Module
class MessagesModule extends VuexModule {
    messages: any = [];

    @Mutation
    saveMessages(data: any) {
        this.messages = [...Object.values(data)]
    }

    @Action
    getMessages(id: string) {
        messagesService.getMessages(id).then(response => {
            this.saveMessages(response.data);
        })
    }

    @Action
    setMessage(message: any) {
        const requestData = {message: message.message, email: message.email};
        messagesService.setMessage( requestData , message.coachId )
            .then(response => this.getMessages(message.coachId))
    }

}

export const messagesStore = new MessagesModule({store, name: 'MessagesStore'})
