import lodash from "lodash"
import { useRef, useState } from "react"
import { BiBold, BiChevronDown, BiChevronUp, BiEdit, BiItalic, BiTrash } from "react-icons/bi"
import { useClickAway } from "react-use"
import { useRecoilState, useRecoilValue } from "recoil"
import { documentController } from "../../../../../api/documentAPI/documentController"
import { Element } from "../../../../../api/types"
import { DocAtom } from "../../../../../store/Doc"
import { EditorAtom } from "../../../../../store/Editor"
type Props = {
    el: Element,
    docID: string,
    index: number,
    onlyRead: boolean
}
const PElement = (props: Props) => {
    const [selectedWord, setSelectedWord] = useState<{id: number, word: string} | null>(null)
    const [words, setWords] = useState<string[]>(props.el.content!.text!.split(' '))
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    const doc = useRecoilValue(DocAtom(props.docID))
    const ref = useRef(null)
    useClickAway(ref, () => {
        setSelectedWord(null)
    })
    const getElementFromEditor = async() => {
        const item = lodash.find(editor, props.el)
        const filtredEditor = lodash.filter(editor, (el) => el !== item)
        await documentController.updateDoc(doc, filtredEditor)
    }
    const getChangePlace = async(to: 'up' | 'down') => {
        const currentPlace = props.index
        const placeWhatNeed = to === 'up' ? props.index - 1 : props.index + 1
        const itemsInBusyPlace = editor[placeWhatNeed]
        const currentItem = editor[currentPlace]
        const changedEditor = editor.map((el, index) => {
            if (placeWhatNeed === index) return currentItem
            if (currentPlace === index) return itemsInBusyPlace
            return el
        })
        await documentController.updateDoc(doc, changedEditor)
    }
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
    if (props.onlyRead) {
        return <p ref={ref} className={`${
            props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
            : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
            : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
            : 'text-left'
        }`}>{words.map((word, index) => {
            const checkToType = word.indexOf('type:')
            const isTag = word.indexOf('#')
            if (checkToType >= 0) {
                const cuttedWord = word.substring(5, word.length)
                const typeWord = cuttedWord.split('=')
                if (typeWord[0] === 'bold') {
                    return <b key={index}>{`${typeWord[1]} `}</b>
                }
                return <em key={index}>{`${typeWord[1]} `}</em>
            }
            if (isTag >= 0) {
                return <span className="text-blue-500 bg-blue-500 bg-opacity-20 py-0.5 px-1 mr-0.5 rounded-lg" key={index}>{`${word} `}</span>
            }
            return `${word} `
        
        })}</p>
    } 
    return <div onMouseEnter={() => setEditMode(true)} onMouseLeave={() => setEditMode(false)} 
    className="w-full h-fit flex flex-col gap-2">
        <p ref={ref} className={`${
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
                const isTag = word.indexOf('#')
                if (checkToType >= 0) {
                    const cuttedWord = word.substring(5, word.length)
                    const typeWord = cuttedWord.split('=')
                    if (typeWord[0] === 'bold') {
                        return <b key={index}>{`${typeWord[1]} `}</b>
                    }
                    return <em key={index}>{`${typeWord[1]} `}</em>
                }
                if (isTag >= 0) {
                    return <span className="text-blue-500 bg-blue-500 bg-opacity-20 py-0.5 px-1 mr-0.5 rounded-lg" key={index}>{`${word} `}</span>
                }
                return <span onClick={() => setSelectedWord({id: index, word: word})} key={index} 
                className="hover:text-neutral-600 hover:bg-neutral-100 hover:py-0.5 hover:px-1 hover:rounded-lg">
                {`${word} `}</span>
            } else {
                const isTag = word.indexOf('#')
                const checkToType = word.indexOf('type:')
                if (checkToType >= 0) {
                    const cuttedWord = word.substring(5, word.length)
                    const typeWord = cuttedWord.split('=')
                    if (typeWord[0] === 'bold') {
                        return <b key={index}>{`${typeWord[1]} `}</b>
                    }
                    return <em key={index}>{`${typeWord[1]} `}</em>
                }
                if (isTag >= 0) {
                    return <span className="text-blue-500 bg-blue-500 bg-opacity-20 py-0.5 px-1 mr-0.5 rounded-lg" key={index}>{`${word} `}</span>
                }
                return (
                    <span onClick={() => setSelectedWord({id: index, word: word})} key={index} 
                    className="hover:text-neutral-600 hover:bg-neutral-100 hover:py-0.5 hover:px-1 hover:rounded-lg">
                    {`${word} `}</span>
                )
            }
        })}
        </p>
        {
            editMode &&
            <section className="w-full h-8 rounded-xl flex items-center gap-1">
                <div className="h-full w-8 rounded-lg flex items-center justify-center bg-neutral-100">
                    <BiEdit/>
                </div>
                <div onClick={getElementFromEditor} className="h-full w-8 rounded-lg flex items-center justify-center bg-neutral-100">
                    <BiTrash/>
                </div>
                {
                    props.index === editor.length - 1
                    ? <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronUp size={20}/></button>
                    : props.index === 0
                    ? <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronDown size={20}/></button>
                    : 
                    <>
                        <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronUp size={20}/></button>
                        <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronDown size={20}/></button>
                    </>
                }
            </section>
        }
    </div> 
}
// type:italic=text
// type:bold=text
export default PElement