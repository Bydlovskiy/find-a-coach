import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'

import {store} from "@/store/MainStore";

import {messagesService} from '@/services/http'

import {ElNotification} from "element-plus/es";
import { IMessageRequest , IMessageResponse } from "@/pages/messages/IMessageType";

@Module
class MessagesModule extends VuexModule {

    messages: IMessageResponse[] | any = [];

    @Mutation
    saveMessages(data: any) {
        this.messages = [...Object.values(data)]
    }

    @Action
    getMessages(id: string) {
        return messagesService.getMessages(id)
            .then(response => {
                if (response.data === null) {
                    console.log('empty')
                } else {
                    this.saveMessages(Object.values(response.data));
                }
            }).catch(() => {
                ElNotification.error({
                        title: 'Error',
                        message: 'Something is wrong, please try again later.',
                        position: 'bottom-right'
                    }
                )
            })
    }

    @Action
    setMessage(message : IMessageRequest) {
        const requestData = {message: message.message, email: message.email};
        messagesService.setMessage(requestData, message.coachId)
            .then(() => this.getMessages(message.coachId))
            .catch(() => {
                ElNotification.error({
                        title: 'Error',
                        message: 'Something is wrong, please try again later.',
                        position: 'bottom-right'
                    }
                )
            })
    }

}

export const messagesStore = new MessagesModule({store, name: 'MessagesStore'})
