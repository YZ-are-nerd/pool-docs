import { useRef, useState } from "react"
import { BiBold, BiItalic } from "react-icons/bi"
import { useClickAway } from "react-use"
import { useRecoilValue } from "recoil"
import { documentController } from "../../../../../api/documentAPI/documentController"
import { Element } from "../../../../../api/types"
import { DocAtom } from "../../../../../store/Doc"
type Props = {
    el: Element,
    docID: string,
    index: number
}
const PElement = (props: Props) => {
    const [selectedWord, setSelectedWord] = useState<{id: number, word: string} | null>(null)
    const [words, setWords] = useState<string[]>(props.el.content!.text!.split(' '))
    const doc = useRecoilValue(DocAtom(props.docID))
    const ref = useRef(null)
    useClickAway(ref, () => {
        setSelectedWord(null)
      })
    const changeWord = async(id: number, word: string, to: 'bold' | 'italic') => {
        const typedWord = `type:${to}=${word}`
        words[id] = typedWord
        setSelectedWord(null)
        const editedElement: Element = {
            type: props.el.type,
            content: {
                text: words.join(' '),
                align: props.el.content.align,
            }
        }
        await documentController.updateDocData(doc, doc.data, editedElement, props.index)
    }
    return <p ref={ref} className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
        : 'text-left'
    }`}
    >{words.map((word, index) => {
        if (selectedWord) {
            if (index === selectedWord.id) return (
                <span key={index} 
                className="relative text-neutral-600 bg-neutral-100 py-0.5 px-1 rounded-lg">
                {`${word} `}
                    <span className="absolute -right-1/2 -bottom-9 w-24 h-8 flex items-center gap-1 p-1 rounded-lg bg-neutral-100">
                        <button onClick={() => changeWord(index, word, 'bold')} className="w-full h-full rounded-lg flex items-center justify-center bg-white">
                            <BiBold size={18} />
                        </button>
                        <button onClick={() => changeWord(index, word, 'italic')} className="w-full h-full rounded-lg flex items-center justify-center bg-white">
                            <BiItalic size={18} />
                        </button>
                    </span>
                </span>
            )
            const checkToType = word.indexOf('type:')
            if (checkToType >= 0) {
                const cuttedWord = word.substring(5, word.length)
                const typeWord = cuttedWord.split('=')
                if (typeWord[0] === 'bold') {
                    return <b key={index}>{`${typeWord[1]} `}</b>
                }
                return <em key={index}>{`${typeWord[1]} `}</em>
            }
            return <span onClick={() => setSelectedWord({id: index, word: word})} key={index} 
            className="hover:text-neutral-600 hover:bg-neutral-100 hover:py-0.5 hover:px-1 hover:rounded-lg">
            {`${word} `}</span>
        } else {
            const checkToType = word.indexOf('type:')
            if (checkToType >= 0) {
                const cuttedWord = word.substring(5, word.length)
                const typeWord = cuttedWord.split('=')
                if (typeWord[0] === 'bold') {
                    return <b key={index}>{`${typeWord[1]} `}</b>
                }
                return <em key={index}>{`${typeWord[1]} `}</em>
            }
            return (
                <span onClick={() => setSelectedWord({id: index, word: word})} key={index} 
                className="hover:text-neutral-600 hover:bg-neutral-100 hover:py-0.5 hover:px-1 hover:rounded-lg">
                {`${word} `}</span>
            )
        }
    })}
    </p>
}
// type:italic=text
export default PElement