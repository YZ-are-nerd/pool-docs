import lodash from "lodash"
import { BiChevronDown, BiChevronUp, BiEdit, BiTrash } from "react-icons/bi"
import { useRecoilValue } from "recoil"
import { documentController } from "../../../../api/documentAPI/documentController"
import { Element } from "../../../../api/types"
import { DocAtom } from "../../../../store/Doc"
import { EditorAtom } from "../../../../store/Editor"

type Props = {
    index: number,
    el: Element,
    docID: string,
}
const ParagraphToolBar: React.FC<Props> = ({index, docID, el}) => {
    const editor = useRecoilValue(EditorAtom('editor'))
    const doc = useRecoilValue(DocAtom(docID))
    const getElementFromEditor = async() => {
        const item = lodash.find(editor, el)
        const filtredEditor = lodash.filter(editor, (el) => el !== item)
        await documentController.updateDoc(doc, filtredEditor)
    }
    const getChangePlace = async(to: 'up' | 'down') => {
        const currentPlace = index
        const placeWhatNeed = to === 'up' ? index - 1 : index + 1
        const itemsInBusyPlace = editor[placeWhatNeed]
        const currentItem = editor[currentPlace]
        const changedEditor = editor.map((el, index) => {
            if (placeWhatNeed === index) return currentItem
            if (currentPlace === index) return itemsInBusyPlace
            return el
        })
        await documentController.updateDoc(doc, changedEditor)
    }
  return (
    <section className="w-full h-8 rounded-xl flex items-center gap-1">
        {/* <div className="h-full w-8 rounded-lg flex items-center justify-center bg-neutral-100">
            <BiEdit/>
        </div> */}
        <div onClick={getElementFromEditor} className="h-full w-8 rounded-lg flex items-center justify-center bg-neutral-100">
            <BiTrash/>
        </div>
        {
            index === editor.length - 1
            ? <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-240 hover:bg-opacity-80"><BiChevronUp size={24}/></button>
            : index === 0
            ? <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-240 hover:bg-opacity-80"><BiChevronDown size={24}/></button>
            : 
            <>
                <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-240 hover:bg-opacity-80"><BiChevronUp size={24}/></button>
                <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-240 hover:bg-opacity-80"><BiChevronDown size={24}/></button>
            </>
        }
    </section>
  )
}

export default ParagraphToolBar