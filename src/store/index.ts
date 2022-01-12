import Vuex from 'vuex'
import CoachesModule from './coaches/index'

export const store = new Vuex.Store({
  modules : {
    coachesModule : CoachesModule
  }
})


