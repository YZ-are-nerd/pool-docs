import React from 'react'
import BoldWord from './BoldWord';
import ItalicWord from './ItalicWord';
import TaggedWord from './TaggedWord';
type Props = {
    word: string,
    index: number,
    readOnly: boolean,
    setSelectedWord: React.Dispatch<React.SetStateAction<{id: number;word: string;} | null>>
}
const TypedWord: React.FC<Props> = ({word, index, readOnly, setSelectedWord}) => {
    if (readOnly) {
        const isTag = word.indexOf('#')
        const checkToType = word.indexOf('type:')
        if (checkToType >= 0) {
            const cuttedWord = word.substring(5, word.length)
            const typeWord = cuttedWord.split('=')
            if (typeWord[0] === 'bold') {
                return <BoldWord key={index} word={typeWord[1]} />
            }
            return <ItalicWord key={index} word={typeWord[1]} />
        }
        if (isTag >= 0) {
            return <TaggedWord key={index} word={word} />
        }
        return <span>{`${word} `}</span>
    }
    const isTag = word.indexOf('#')
    const checkToType = word.indexOf('type:')
    if (checkToType >= 0) {
        const cuttedWord = word.substring(5, word.length)
        const typeWord = cuttedWord.split('=')
        if (typeWord[0] === 'bold') {
            return <BoldWord key={index} word={typeWord[1]} />
        }
        return <ItalicWord key={index} word={typeWord[1]} />
    }
    if (isTag >= 0) {
        return <TaggedWord key={index} word={word} />
    }
    return (
        <span onClick={() => setSelectedWord({id: index, word: word})} key={index} 
        className="cursor-pointer hover:text-neutral-600 hover:bg-neutral-100 hover:py-0.5 hover:px-1 hover:rounded-lg">
        {`${word} `}</span>
    )
}

export default TypedWord