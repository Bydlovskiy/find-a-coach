import axios from 'axios'

import {IUserRequest} from '@/pages/auth/IUserType'

class AuthService {
    apiKey = 'AIzaSyCvYGKKzHi0w8PmgXktVeNaP0ulu5LONOo'

    signUpAndLogin(userData: IUserRequest, href: string) {
        return axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:${href}${this.apiKey}`,
            {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true
            }
        )
    }

}

export const authService = new AuthService()