import { atomFamily, selectorFamily } from 'recoil';
import { Element } from '../api/types';

export const EditorAtom = atomFamily({
    key: 'editor',
    default: selectorFamily({
        key: 'editorSelector',
        get: (id: string) => () => {
            const value: Element[] = []
            return value as Element[]
        }
    }),
})