import { useState } from "react"
import { BiX } from "react-icons/bi"
import { useRecoilState } from "recoil"
import { Element } from "../../../../../api/types"
import { EditorAtom } from "../../../../../store/Editor"
import lodash from 'lodash'
import { DocAtom } from "../../../../../store/Doc"
import { documentController } from "../../../../../api/documentAPI/documentController"
type Props = {
    el: Element,
    docID: string,
}
const H1Element = (props: Props) => {
    const [doc, setDoc] = useRecoilState(DocAtom(props.docID))
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    const getElementFromEditor = async() => {
        const item = lodash.find(editor, props.el)
        const filtredEditor = lodash.filter(editor, (el) => el !== item)
        const updatedDoc = await documentController.updateDoc(doc, filtredEditor)
        if (updatedDoc) {
            setDoc(updatedDoc)
            setEditor(updatedDoc.data)
        }
    }
    if (editMode) {
        return (
        <div onMouseLeave={() => setEditMode(false)} className="w-full h-fit flex items-center gap-2">
            <h1 className={`${
                props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
                : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
                : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
                : 'text-left'
            }`}
            >{props.el.content.text}</h1>
            <button onClick={getElementFromEditor} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiX className="text-red-400" size={20}/></button>
        </div>
    )
    } return <h1 onMouseEnter={() => setEditMode(true)} className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
        : 'text-left'
    }`}
    >{props.el.content.text}</h1>
}

export default H1Element