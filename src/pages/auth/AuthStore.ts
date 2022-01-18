import {Module, VuexModule, Mutation, Action} from 'vuex-class-modules'

import {authService} from '@/services/http'

// import {IUserRequest} from './IUserType'

import {store} from "@/store/MainStore";

import {ElNotification} from "element-plus/es";

@Module
export default class AuthModule extends VuexModule {

    signUpHref = 'signUp?key='

    logInHref = 'signInWithPassword?key='

    userData: any = {
        token: '',
        userId: '',
    }

    @Mutation
    setUser(userData: any) {
        this.userData.token = userData.token,
            this.userData.userId = userData.userId
    }

    @Action
    signUp(userData: any) {
        return authService.signUpAndLogin(userData, this.signUpHref)
            .then(() => {
                ElNotification.success({
                    title: 'Success',
                    message: 'You registered successfully!',
                    position: 'bottom-right'
                });
            })
            .catch(() => {
                ElNotification.error(
                    {
                        title: 'Error',
                        message: 'Something was wrong.Try again.',
                        position: 'bottom-right'
                    }
                )
            })

    }

    @Action
    logIn(userData: any) {
        return authService.signUpAndLogin(userData , this.logInHref)
            .then(response => {
                authStore.setUser({
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiresIn', response.data.expiresIn);
                ElNotification.success({
                    title: 'Success',
                    message: 'You logined successfully!',
                    position: 'bottom-right'
                });
            })
            .catch(() => {
                ElNotification.error(
                    {
                        title: 'Error',
                        message: 'Something was wrong.Try again.',
                        position: 'bottom-right'
                    }
                )
            });

    }

    @Action
    trylogin() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expiresIn = localStorage.getItem('expiresIn');
        if (token && userId && expiresIn) {
            this.setUser({token: token, userId: userId})
        }
    }

    @Action
    logOut() {
        this.setUser({token: '', userId: ''});
        localStorage.clear();
        ElNotification.success({
            title: 'Success',
            message: 'You log out successfully!',
            position: 'bottom-right'
        })
    }
}

export const authStore = new AuthModule({store, name: 'AuthStore'})
