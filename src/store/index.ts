import { createStore } from 'vuex'
import coachesModule from './coaches/index'

export default createStore({
  state() {
    return {

    }
  },
  mutations: {
  },
  actions: {
  },
  modules: { coaches: coachesModule },

})
