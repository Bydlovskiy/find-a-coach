import auth from '../AxiosAuth'
import { IUser } from '@/pages/auth/IUserType'

export default {
    apiKey: 'AIzaSyCvYGKKzHi0w8PmgXktVeNaP0ulu5LONOo',
    signUpAndLogin(userData: IUser, href: string) {
        return auth({
            url: `${href}${this.apiKey}`,
            method: 'post',
            data: {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true
            }
        }
        )
    }

}