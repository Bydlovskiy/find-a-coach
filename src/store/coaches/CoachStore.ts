<<<<<<< HEAD
import { Module, VuexModule, Mutation, Action } from 'vuex-class-modules'
=======
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
>>>>>>> origin/develop
import http from '@/services/http/couches/CouchesService'
import { ICoach } from '@/pages/coaches/CoachType'
import { store } from '@/store/MainStore'
@Module
export default class CoachesModule extends VuexModule {
    coachesList: ICoach[] = [
        // {
        //     id: 'c1',
        //     firstName: 'Maximilian',
        //     lastName: 'Schwarzmüller',
        //     areas: ['frontend', 'backend', 'career'],
        //     description:
        //         "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        //     hourlyRate: 30
        // },
        // {
        //     id: 'c2',
        //     firstName: 'Julie',
        //     lastName: 'Jones',
        //     areas: ['frontend', 'career'],
        //     description:
        //         'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        //     hourlyRate: 30
        // }
    ]

    get coaches() {
<<<<<<< HEAD
        return this.coachesList
=======
        return this.coachesList 
>>>>>>> origin/develop
    }

    @Mutation
    setCoaches(data: ICoach[]) {
        this.coachesList = data;
    }
<<<<<<< HEAD
    @Action
    getCoaches() {
        http.getData()
            .then((data: any) => {
                this.setCoaches(data.data)
            })
    }
    @Action
=======
    @Action({ rawError: true })
    getCoaches() {
        http.getData()
            .then((data: any) => {
                this.context.commit('setCoaches', data.data)
            })
    }
    @Action({ rawError: true })
>>>>>>> origin/develop
    setCoach(coach: ICoach) {
        http.setCoach(coach)
    }


}
<<<<<<< HEAD
export const coachStore = new CoachesModule({ store, name: 'CoachStore' })
=======
export const coachStore = new CoachesModule({ store , name : 'CoachStore'})
>>>>>>> origin/develop

