import { Module, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators'
import { store } from '../index'
@Module
class CoachesModule extends VuexModule {
    listGetError = false;
    coachesList = [
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
    get coachDetails() {
        return
        // return state.coachList.find(coach  => coach.id === this.currentCoachId)
    }

    @Mutation
    setCoaches(data: any) {
        this.coachesList = data;
    }
}

export const coachesStore = new CoachesModule({ store, name: 'coachesStore' })