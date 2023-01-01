import { atomFamily, selectorFamily } from 'recoil';

export const EditMode = atomFamily({
    key: 'editMode',
    default: selectorFamily({
        key: 'editModeSelector',
        get: (id: string) => () => {
            return false
        }
    })
})