import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {routeGuards} from '@/router/Route.guards'
import {routeNames} from '@/router/Route.names'
import CoachesList from '../pages/coaches/CoachesList.vue'
import CoachesDetail from '../pages/coaches/CoachDetail.vue'
import CoachesContact from '../pages/coaches/CoachesContact.vue'
import UserAuth from '../pages/auth/UserAuth.vue'
import MessagesList from '../pages/messages/MessagesList.vue'
import CoachRegister from '../pages/coaches/CoachRegister.vue'

const routes: Array<RouteRecordRaw> = [
    {path: '/', redirect: '/coaches'},
    {path: '/coaches', name: routeNames.coachesList, component: CoachesList},
    {
        path: '/coaches/:id', name: routeNames.coachDetail, component: CoachesDetail, props: true, children: [
            {path: 'contact', name: routeNames.coachContact, component: CoachesContact, props: true,}
        ]
    },
    {path: '/user-auth', name: routeNames.auth, component: UserAuth, meta: {dontNeedAuth: true}},
    {path: '/messages', name: routeNames.messageList, component: MessagesList, meta: {needAuth: true}},
    {path: '/register', name: routeNames.coachRegister, component: CoachRegister, meta: {needAuth: true}},
    {path: '/:somethingWrong(.*)', name: routeNames.wrongPath, redirect: routeNames.coachesList},
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(routeGuards);


export default router
