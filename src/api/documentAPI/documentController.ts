import { documentModel } from './documentModel';
export const documentController = (() => {
    return {
        createDocument: async(userID: string) => {
            const res = await documentModel.createDocument(userID)
            return res
        },
        getDocByDocID: async(docID: string) => {
            const res = await documentModel.getDocByDocID(docID)
            return res
        },
        getDocsByOwnerUid: async(owner_uid: string) => {
            const res = await documentModel.getDocsByOwnerUid(owner_uid)
            return res
        }
    }
})()