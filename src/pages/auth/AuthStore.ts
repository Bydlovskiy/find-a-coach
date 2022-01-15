import { Module, VuexModule, Mutation, Action } from 'vuex-class-modules'
import http from '@/services/http/auth/AuthService'
import { IUser } from '@/pages/auth/IUserType'
import { IUserRegisterResponse } from '@/pages/auth/IUserRegisterResponse'
import { store } from "@/store/MainStore";

@Module
export default class AuthModule extends VuexModule {
    signUpHref = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    logInHref = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    userData: IUserRegisterResponse = {
        token: '',
        expiresIn: '',
        userId:  '',
    }

    @Mutation
    setUser(userData: IUserRegisterResponse) {
        this.userData.token = userData.token,
        this.userData.expiresIn = userData.expiresIn,
        this.userData.userId = userData.userId
    }

    @Action
    signUp(userData: IUser) {
        http.signUpAndLogin(userData,this.signUpHref).then(response => {
            if (response.status < 300 && response.status >= 200) {
                console.log(response);
                this.setUser({
                    token: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    userId: response.data.localId
                })
            }
        })
    }
    @Action
    logIn(userData: IUser){
        http.signUpAndLogin(userData,this.logInHref)
            .then(response => {
            if (response.status < 300 && response.status >= 200) {
                console.log(response);
                this.setUser({
                    token: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    userId: response.data.localId
                })
            }
        })
    }
}

export const authStore = new AuthModule({ store , name : 'AuthStore'})
