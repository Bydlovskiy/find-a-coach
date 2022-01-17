import {Module, VuexModule, Mutation, Action} from 'vuex-class-modules'
import { authService } from '@/services/http'
import {IUser} from '@/pages/auth/IUserType'
import {IUserRegisterResponse} from '@/pages/auth/IUserRegisterResponse'
import {store} from "@/store/MainStore";

@Module
export default class AuthModule extends VuexModule {

    signUpHref = 'signUp?key='

    logInHref = 'signInWithPassword?key='

    userData: IUserRegisterResponse = {
        token: '',
        expiresIn: '',
        userId: '',
    }

    @Mutation
    setUser(userData: IUserRegisterResponse) {
        this.userData.token = userData.token,
            this.userData.expiresIn = userData.expiresIn,
            this.userData.userId = userData.userId
    }

    @Action
    signUp(userData: IUser) {
        return authService.signUpAndLogin(userData, this.signUpHref);
    }

    @Action
    logIn(userData: IUser) {
        return authService.signUpAndLogin(userData, this.logInHref);
    }
}

export const authStore = new AuthModule({store, name: 'AuthStore'})
