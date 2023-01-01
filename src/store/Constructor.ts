import { atom } from 'recoil';
export type ElementConstructor = {
    type: string,
    element: JSX.Element
}
export const Constructor = atom<ElementConstructor | null>({
    key: 'Constructor',
    default: null
})