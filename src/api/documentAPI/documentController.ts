import { Doc, Element } from '../types';
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
        },
        updateDoc: async(doc: Doc, editorData: Element[]) => {
            const res = await documentModel.updateDoc(doc, editorData)
            return res
        },
        updateDocData: async(doc: Doc, editorData: Element[], editedElement: Element, indexOfEditedElement: number) => {
            await documentModel.updateDocData(doc, editorData, editedElement, indexOfEditedElement)
        },
        updateDocTitle: async(doc: Doc, title: string) => {
            await documentModel.updateDocTitle(doc, title)
        }
    }
})()