import Vuex from 'vuex'
import CoachesModule from './coaches/CoachStore'
import AuthModule from './auth/AuthStore'

export const store = new Vuex.Store({
  modules : {
    CoachesModule : CoachesModule,
    AuthModule : AuthModule
  }
})


