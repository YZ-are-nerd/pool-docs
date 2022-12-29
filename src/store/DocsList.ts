import { User } from './User';
import { documentController } from './../api/documentAPI/documentController';
import { atom, selector } from "recoil";

export const DocsAtom = atom({
    key: "docs",
    default: selector({
        key: "docsSelector",
        get: async({get}) => {
            const user = get(User)
            if (user) {
                const doc = await documentController.getDocsByOwnerUid(user.id);
                return doc
            }
            return null
        }
    })
})