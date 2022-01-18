import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import {authStore} from "@/pages/auth/AuthStore";

export const routeGuards = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
    if (!authStore.userData.userId && to.meta.needAuth) {
        next('/user-auth')
    } else if (authStore.userData.userId && to.meta.dontNeedAuth) {
        next('/coaches')
    } else {
        next()
    }
}