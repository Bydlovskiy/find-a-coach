import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import http from '@/services/http/coaches/CoachesService'
import {ICoach} from '@/pages/coaches/CoachType'
import {authStore} from '@/pages/auth/AuthStore'
import {store} from "@/store/MainStore";


@Module
class CoachesModule extends VuexModule {
    coaches: ICoach[] = []
    setError = false;
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


    get hashedCoaches() {
        return this.coaches
            .reduce((acc: any, coach) => {
                acc[coach.id] = coach
                return acc
            }, {})
    }

    @Mutation
    setCoaches(data: ICoach[]) {
        this.coaches = [...data];
    }

    @Action
    getCoaches() {
        http.getData()
            .then((data: any) => {
                this.setCoaches(Object.values(data.data))
            })
    }

    @Action
    setCoach(coach: any) {
        http.setCoach({...coach, id: authStore.userData.userId})
            .then(() => this.getCoaches())
            .catch(() => this.setError = true)
    }
}

export const coachStore = new CoachesModule({store, name: 'CoachStore'})