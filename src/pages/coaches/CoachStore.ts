import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'

import {coachesService} from "@/services/http";

import {ICoachRequest , ICoachResponse } from './ICoachType'

import {authStore} from '@/pages/auth/AuthStore'

import {store} from "@/store/MainStore";

import {ElNotification} from "element-plus/es";

@Module
class CoachesModule extends VuexModule {
    coaches: ICoachResponse[] = []

    get hashedCoaches() {
        return this.coaches
            .reduce((acc : any, coach) => {
                acc[coach.id] = coach
                return acc
            }, {})
    }

    @Mutation
    saveCoaches(data: ICoachResponse[]) {
        this.coaches = [...data];
    }

    @Action
    getCoaches() {
        return coachesService.getCoachesList()
            .then((data: any) => {
                const coachesList: ICoachResponse[] = []
                if (data.data === null) {
                    this.saveCoaches(coachesList)
                } else {
                    Object.values(data.data).forEach((coach: any) => {
                        coachesList.push(Object.values(coach)[0] as ICoachResponse);
                    });
                    this.saveCoaches(coachesList)
                }
            })
            .catch(() => {
                ElNotification.error({
                        title: 'Error',
                        message: 'Something is wrong, please try again later.',
                        position: 'bottom-right'
                    }
                )
            })
    }

    @Action
    setCoach(coach: ICoachRequest | any) {
        coachesService.setCoach({...coach, id: authStore.userData.userId})
            .then(() => this.getCoaches())
            .catch(() => {
                ElNotification.error({
                        title: 'Error',
                        message: 'Something is wrong, please try again later.',
                        position: 'bottom-right'
                    }
                )
            })
    }

    @Action
    deleteCoach() {
        coachesService.deleteCoach(authStore.userData.userId)
            .then(() => {
                this.getCoaches();
            })
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

export const coachStore = new CoachesModule({store, name: 'CoachStore'})

