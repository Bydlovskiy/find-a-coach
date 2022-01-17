import http from '../MainAxios'

import { ICoach } from '@/pages/coaches/CoachType'

import {authStore} from "@/pages/auth/AuthStore";

class CoachesService {

    getCoachesList() {
        return http.get('/coaches.json')
    }

    setCoach(coach: ICoach) {
        return http.post(`/coaches/${coach.id}.json?auth=${authStore.userData.token}`, coach)
    }

    deleteCoach(id : string) {
        return http.delete(`/coaches/${id}.json?auth=${authStore.userData.token}`)
    }
}
export const coachesService = new CoachesService();
