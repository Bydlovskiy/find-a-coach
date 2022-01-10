import http from '@/services/http/couches/index'

export default {
    state() {
        return {
            listGetError: false,
            coachesList: []
        }
    },
    actions: {
        getCoaches(context: any) {
            http.getData()
                .then(data => {
                    context.commit('setCoaches', data.data)
                })
                .catch(err => {
                    console.log(err);
                    
                })
        }
    },
    mutations: {
        setCoaches(state: any, data: any) {
            state.coachesList = data;
        }
    },
    getters: {
        coachesList(state: any) {
            return state.coachesList
        }
    }
}