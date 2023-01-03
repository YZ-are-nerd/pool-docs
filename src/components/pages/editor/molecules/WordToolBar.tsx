import { BiBold, BiItalic } from "react-icons/bi"
import { useRecoilValue } from "recoil";
import { documentController } from "../../../../api/documentAPI/documentController";
import { Element } from "../../../../api/types";
import { DocAtom } from "../../../../store/Doc";
type Props = {
    word: string,
    index: number
    words: string[],
    el: Element,
    docID: string,
    setSelectedWord: React.Dispatch<React.SetStateAction<{id: number;word: string;} | null>>,
}
const WordToolBar: React.FC<Props> = ({index, word, words, docID, el, setSelectedWord}) => {
    const doc = useRecoilValue(DocAtom(docID))
    const changeWord = async(id: number, word: string, to: 'bold' | 'italic') => {
        const typedWord = `type:${to}=${word}`
        words[id] = typedWord
        setSelectedWord(null)
        const editedElement: Element = {
            type: el.type,
            content: {
                text: words.join(' '),
                align: el.content.align,
            }
        }
        await documentController.updateDocData(doc, doc.data, editedElement, index)
    }
  return (
    <span className="absolute -right-1/2 -bottom-9 w-24 h-8 flex items-center gap-1 p-1 rounded-lg bg-neutral-100">
        <button onClick={() => changeWord(index, word, 'bold')} className="w-full h-full rounded-lg flex items-center justify-center bg-white">
            <BiBold size={18} />
        </button>
        <button onClick={() => changeWord(index, word, 'italic')} className="w-full h-full rounded-lg flex items-center justify-center bg-white">
            <BiItalic size={18} />
        </button>
    </span>
  )
}

export default WordToolBar