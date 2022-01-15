import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CoachesList from '../pages/coaches/CoachesList.vue'
import CoachesDetail from '../pages/coaches/CoachDetail.vue'
import MessageRequest from '../pages/messages/MessageRequest.vue'
import UserAuth from '../pages/auth/UserAuth.vue'
import MessagesList from '../pages/messages/MessagesList.vue'
import CoachRegister from '../pages/coaches/CoachRegister.vue'
import WrongPath from '../pages/error/WrongPath.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id', component: CoachesDetail, props : true, children: [
      { path: 'contact', component: MessageRequest, props : true, }
    ]
  },
  { path: '/user-auth', component: UserAuth },
  { path: '/messages', component: MessagesList },
  { path: '/register', component: CoachRegister },
  { path: '/:somethingWrong(.*)', component: WrongPath }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
