import http from '../MainAxios'
import { ICoach } from '@/pages/coaches/CoachType'

export default {
    getData() {
        return http.get('/coaches.json')
    },

    setCoach(coach: ICoach) {
        return http.post("/coaches.json", coach)
    }
}
