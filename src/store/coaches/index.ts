import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import http from '@/services/http/couches/index'
import { Coach } from '@/pages/coaches/CoachType'
@Module
export default class CoachesModule extends VuexModule {
    coachesList: Coach[] = [
        {
            id: 'c1',
            firstName: 'Maximilian',
            lastName: 'Schwarzmüller',
            areas: ['frontend', 'backend', 'career'],
            description:
                "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
            hourlyRate: 30
        },
        {
            id: 'c2',
            firstName: 'Julie',
            lastName: 'Jones',
            areas: ['frontend', 'career'],
            description:
                'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
            hourlyRate: 30
        }
    ]

    get coaches() {
        return this.coachesList
    }

    @Mutation
    setCoaches(data: any) {
        this.coachesList = data;
    }
    @Action({ rawError: true })
    getCoaches() {
        console.log(';qwertyuiop[');

        http.getData()
            .then(data => {
                console.log(data.data);
                this.context.commit('setCoaches', data.data)
            })
    }
}

