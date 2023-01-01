import { Element } from './../components/pages/editor/atoms/elementsConstructor/H1Constructor';
import { atomFamily, selectorFamily } from 'recoil';

export const EditorAtom = atomFamily({
    key: 'editor',
    default: selectorFamily({
        key: 'editorSelector',
        get: (id: string) => () => {
            const value: Element[] = []
            return value
        }
    })
})