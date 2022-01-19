import {Module, VuexModule, Mutation, Action} from 'vuex-class-modules'

import {authService} from '@/services/http'

import {store} from "@/store/MainStore";

import {ElNotification} from "element-plus/es";

import {IUserRequest} from "@/pages/auth/IUserRequestType";

import {IUserResponse} from "@/pages/auth/IUserResponseType";
import router from "@/router";
import {routeNames} from "@/router/Route.names";

@Module
export default class AuthModule extends VuexModule {

    timer: any;

    reset = false;

    isAutoLogout = false;

    signUpHref = 'signUp?key='

    logInHref = 'signInWithPassword?key='


    userData: IUserResponse = {
        token: '',
        userId: '',
    }

    @Mutation
    setUser(userData: IUserResponse) {
        this.userData.token = userData.token;
        this.userData.userId = userData.userId;
        this.isAutoLogout = false;
    }

    @Mutation
    setAutoLogout() {
        this.isAutoLogout = true;
    }

    @Action
    signUp(userData: IUserRequest) {
        authService.signUpAndLogin(userData, this.signUpHref)
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
    logIn(userData: IUserRequest) {
        authService.signUpAndLogin(userData, this.logInHref)
            .then(response => {
                authStore.setUser({
                    token: response.data.idToken,
                    userId: response.data.localId,
                });
                const expirationTime = response.data.expiresIn * 1000
                const expirationDate: number = new Date().getTime() + expirationTime
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiresIn', String(expirationDate));
                this.timer = setTimeout(() => {
                    this.logOut();
                    this.setAutoLogout();
                }, expirationTime);
            })
            .then(() => {
                ElNotification.success({
                    title: 'Success',
                    message: 'You logined successfully!',
                    position: 'bottom-right'
                });
                router.push({name: routeNames.coachesList})
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
        const expiresIn: string | null = localStorage.getItem('expiresIn');
        const expirationDate = +(expiresIn as string) - new Date().getTime();
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

export const authStore = new AuthModule({store, name: 'AuthStore'});
