import { modelAPI } from './model.api';


export const controllerAPI = (() => {
    return {
        signIn: async() => {
            await modelAPI.signIn()
        },
        signOut: async() => {
            await modelAPI.signOut()
        },
        getUserByID: async(id: string) => {
            const user = await modelAPI.getUserByID(id)
            return user
        },
        checkProfile: async() => {
            const res = await modelAPI.checkProfile()
            return res
        },
    }
})()