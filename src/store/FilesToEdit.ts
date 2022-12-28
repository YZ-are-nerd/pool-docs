import { FileObject } from '@supabase/storage-js';
import { PathAtom } from './Path';
import { storageModelAPI } from './../api/storageAPI/storageModelAPI';
import { atomFamily, selectorFamily } from "recoil";


export const FilesToEdit = atomFamily({
    key: 'bucketToEdit',
    default: selectorFamily({
        key: 'bucketToEditSelector',
        get: (userID: string) => async({get}) => {
            const path = get(PathAtom(userID))
            const formattedPath = path.length === 1 ? path[0] : path.join('/')
            const bucketDetails = await storageModelAPI.getDetailsBucket(userID)
            const onlyTxtFiles: FileObject[] = []
            if (bucketDetails) {
                bucketDetails.forEach((file) => {
                    if (file.metadata.mimetype === 'text/plain') onlyTxtFiles.push(file)
                })
            }
            console.log(onlyTxtFiles);
            return onlyTxtFiles as FileObject[] | null
        }
    })
})