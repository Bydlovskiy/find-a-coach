import {Module, VuexModule, Mutation, Action} from 'vuex-class-modules'

import {authService} from '@/services/http'

import {store} from "@/store/MainStore";

import {ElNotification} from "element-plus/es";

@Module
export default class AuthModule extends VuexModule {

    timer: any;

    isAutoLogout = false;

    signUpHref = 'signUp?key='

    logInHref = 'signInWithPassword?key='


    userData: any = {
        token: '',
        userId: '',
    }

    @Mutation
    setUser(userData: any) {
        this.userData.token = userData.token,
            this.userData.userId = userData.userId,
            this.isAutoLogout = false;
    }

    @Mutation
    setAutoLogout() {
        this.isAutoLogout = true;
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
        return authService.signUpAndLogin(userData, this.logInHref)
            .then(response => {
                authStore.setUser({
                    token: response.data.idToken,
                    userId: response.data.localId,
                });
                const expirationTime = 5000
                // response.data.expiresIn * 1000
                const expirationDate: number = new Date().getTime() + expirationTime
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiresIn', String(expirationDate));

                this.timer = setTimeout(() => {
                    this.logOut();
                    this.setAutoLogout();
                }, expirationTime)
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
        const expiresIn: any = localStorage.getItem('expiresIn');

        const expirationDate = +expiresIn - new Date().getTime();

        if (expirationDate < 0) {
            return
        }

        this.timer = setTimeout(() => {
            this.logOut();
            this.setAutoLogout()
        }, expirationDate);

        if (token && userId && expiresIn) {
            this.setUser({token: token, userId: userId})
        }
    }

    @Action
    logOut() {
        clearTimeout(this.timer)
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
