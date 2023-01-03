import lodash from 'lodash'
import React from 'react'
import { BiX, BiChevronUp, BiChevronDown } from 'react-icons/bi'
import { useRecoilValue } from 'recoil'
import { documentController } from '../../../../api/documentAPI/documentController'
import { Element } from '../../../../api/types'
import { DocAtom } from '../../../../store/Doc'
import { EditorAtom } from '../../../../store/Editor'
type Props = {
    el: Element,
    index: number,
    docID: string
}
const HeadersToolBar: React.FC<Props> = ({el, index, docID}) => {
    const doc = useRecoilValue(DocAtom(docID))
    const editor = useRecoilValue(EditorAtom('editor'))
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
    <div className="w-fit h-fit flex lg:flex-row flex-col gap-1">
        <button onClick={getElementFromEditor} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiX className="text-red-400" size={20}/></button>
        {
            index === editor.length - 1
            ? <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronUp size={20}/></button>
            : index === 0
            ? <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronDown size={20}/></button>
            : 
            <>
                <button onClick={() => getChangePlace('up')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronUp size={20}/></button>
                <button onClick={() => getChangePlace('down')} className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-80"><BiChevronDown size={20}/></button>
            </>
        }
    </div>
  )
}

export default HeadersToolBar