import http from '@/services/http/couches/index'

export default {
    getCoaches(context: any) {
        http.getData()
            .then(data => {
                context.commit('setCoaches', data.data)
            })
            .catch(() => {
                context.store.listGetError = true
            })
    }
}