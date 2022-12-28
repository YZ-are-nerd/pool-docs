import { UserData } from './../api/types';
import { selector, atom } from 'recoil';
import { controllerAPI } from '../api/controller.api';

export const User = atom<UserData | null>({
    key: 'User',
    default: selector({
        key: "UserSelector",
        get: async() => {
            const user = await controllerAPI.checkProfile()
            return user
        }
    })
})