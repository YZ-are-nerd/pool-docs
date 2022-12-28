import { PathAtom } from './Path';
import { storageModelAPI } from './../api/storageAPI/storageModelAPI';
import { atomFamily, selectorFamily } from "recoil";


export const UserBucket = atomFamily({
    key: 'bucket',
    default: selectorFamily({
        key: 'bucketSelector',
        get: (userID: string) => async({get}) => {
            const path = get(PathAtom(userID))
            const formattedPath = path.length === 1 ? path[0] : path.join('/')
            const bucketDetails = await storageModelAPI.getDetailsBucket(formattedPath)
            console.log(bucketDetails);
            return bucketDetails
        }
    })
})