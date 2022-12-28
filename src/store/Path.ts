import { selectorFamily } from 'recoil';
import { atomFamily } from 'recoil';

export const PathAtom = atomFamily({
    key: 'path',
    default: selectorFamily({
        key: 'pathSelector',
        get: (userID: string) => () => {
            const path: string[] = []
            path.push(userID)
            return path
        }
    })
})