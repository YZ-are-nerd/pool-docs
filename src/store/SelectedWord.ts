import { selectorFamily } from 'recoil';
import { atomFamily } from 'recoil';


export const SelectedWord = atomFamily({
    key: 'word',
    default: selectorFamily({
        key: 'seletedWord',
        get: (word: string) => () => {
            console.log(word);
            return word
        }
    })
})