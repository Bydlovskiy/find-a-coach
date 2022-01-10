import { createStore } from 'vuex'
import couchesModule from './couches/index'

export default createStore({
  state() {
    return {

    }
  },
  mutations: {
  },
  actions: {
  },
  modules: { couches: couchesModule },

})
