import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {coachesService} from "@/services/http";
import {ICoach} from '@/pages/coaches/CoachType'
import {authStore} from '@/pages/auth/AuthStore'
import {store} from "@/store/MainStore";
import firebase from "firebase/compat";
import onLog = firebase.onLog;


@Module
class CoachesModule extends VuexModule {
    coaches: ICoach[] = []


    get hashedCoaches() {
        return this.coaches
            .reduce((acc: any, coach) => {
                acc[coach.id] = coach
                return acc
            }, {})
    }

    @Mutation
    saveCoaches(data: ICoach[]) {
        this.coaches = [...data];
    }

    @Action
    getCoaches() {
        coachesService.getCoachesList()
            .then((data: any) => {
                const coachesList: any[] = []
                Object.values(data.data).forEach((coach: any) => {
                    coachesList.push(Object.values(coach)[0]);
                });
                this.saveCoaches(coachesList)
            })
    }

    @Action
    setCoach(coach: any) {
        coachesService.setCoach({...coach, id: authStore.userData.userId})
            .then(() => this.getCoaches())
    }

    @Action
    deleteCoach() {
        coachesService.deleteCoach(authStore.userData.userId)
            .then(() => {
                this.getCoaches();
            })
    }
}

export const coachStore = new CoachesModule({store, name: 'CoachStore'})

