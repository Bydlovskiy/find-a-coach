import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {routeGuards} from "@/router/Route.guards";
import CoachesList from '../pages/coaches/CoachesList.vue'
import CoachesDetail from '../pages/coaches/CoachDetail.vue'
import CoachesContact from '../pages/coaches/CoachesContact.vue'
import UserAuth from '../pages/auth/UserAuth.vue'
import MessagesList from '../pages/messages/MessagesList.vue'
import CoachRegister from '../pages/coaches/CoachRegister.vue'

import {routeNames} from "@/router/Route.names";


const routes: Array<RouteRecordRaw> = [
    {path: '/', redirect: routeNames.coachesList},
    {path: routeNames.coachesList, component: CoachesList},
    {
        path: routeNames.coachDetail, component: CoachesDetail, props: true, children: [
            {path: routeNames.coachContact, component: CoachesContact, props: true,}
        ]
    },
    {path: routeNames.auth, component: UserAuth, meta: {dontNeedAuth: true}},
    {path: routeNames.messageList, component: MessagesList, meta: {needAuth: true}},
    {path: routeNames.coachRegister, component: CoachRegister, meta: {needAuth: true}},
    {path: routeNames.wrongPath, redirect: routeNames.coachesList},
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(routeGuards);


export default router
