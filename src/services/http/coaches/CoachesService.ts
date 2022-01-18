import http from '../MainAxios'

import { ICoachResponse} from '@/pages/coaches/ICoachType'

import {authStore} from "@/pages/auth/AuthStore";

class CoachesService {

    getCoachesList() {
        return http.get('/coaches.json')
    }

    setCoach(coach: ICoachResponse) {
        return http.post(`/coaches/${coach.id}.json?auth=${authStore.userData.token}`, coach)
    }

    deleteCoach(id : string) {
        return http.delete(`/coaches/${id}.json?auth=${authStore.userData.token}`)
    }
}
export const coachesService = new CoachesService();
