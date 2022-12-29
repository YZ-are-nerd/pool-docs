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
        }
    }
})()