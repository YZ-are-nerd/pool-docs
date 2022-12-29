import { documentController } from './../api/documentAPI/documentController';
import { atomFamily, selectorFamily } from "recoil";

export const DocAtom = atomFamily({
    key: "doc",
    default: selectorFamily({
        key: "docSelector",
        get: (docID: string) => async() => {
            const doc = await documentController.getDocByDocID(docID)
            return doc
        }
    })
})