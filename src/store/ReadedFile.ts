import { selectorFamily } from 'recoil';


export const ReadedFile = selectorFamily({
    key: 'ReadedFile',
    get: (path: string) => () => {
        const reader = new FileReader();
        
    }
})