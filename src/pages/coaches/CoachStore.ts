import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules'

import http from '@/services/http/couches/CouchesService'
import { ICoach } from '@/pages/coaches/CoachType'
import { store } from '@/store/MainStore'

@Module
class CoachesModule extends VuexModule {
    coaches: ICoach[] = [
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

    get hashedCoaches () {
        return this.coaches.reduce((acc, coach) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            acc[coach.id] = coach
            return acc
        }, {})
    }

    @Mutation
    setCoaches(data: ICoach[]) {
        this.coaches = data;
    }

    @Action
    getCoaches() {
        http.getData()
            .then((data: any) => {
                this.setCoaches(data.data)
            })
    }

    @Action
    setCoach(coach: ICoach) {
        http.setCoach(coach)
    }
}

export const coachStore = new CoachesModule({ store , name : 'CoachStore'})

