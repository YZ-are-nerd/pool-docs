import lodash from "lodash"
import { useState } from "react"
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi"
import { useRecoilState } from "recoil"
import { documentController } from "../../../../../api/documentAPI/documentController"
import { Element } from "../../../../../api/types"
import { DocAtom } from "../../../../../store/Doc"
import { EditorAtom } from "../../../../../store/Editor"

type Props = {
    el: Element,
    docID: string,
    onlyRead: boolean,
    index: number
}
const H3Element = (props: Props) => {
    const [doc, setDoc] = useRecoilState(DocAtom(props.docID))
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
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
    if (props.onlyRead) {
        return <h3 className={`${
            props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
            : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
            : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
            : 'text-left'
        }`}
        >{props.el.content.text}</h3>
    }
    if (editMode) {
        return (
        <div onMouseLeave={() => setEditMode(false)} className="w-full h-fit flex items-center gap-2">
            <h3 className={`${
                props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
                : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
                : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
                : 'text-left'
            }`}
            >{props.el.content.text}</h3>
            <div className="w-fit h-fit flex lg:flex-row flex-col gap-1">
                <button onClick={getElementFromEditor} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiX className="text-red-400" size={20}/></button>
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
            </div>
        </div>
    )
    } return <h3 onMouseEnter={() => setEditMode(true)} className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
        : 'text-left'
    }`}
    >{props.el.content.text}</h3>
}

export default H3Element