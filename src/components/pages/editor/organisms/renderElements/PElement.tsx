import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { Element } from "../../../../../api/types"
import TypedWord from "../../atoms/TypedWord"
import ParagraphToolBar from "../../molecules/ParagraphToolBar"
import WordToolBar from "../../molecules/WordToolBar"
type Props = {
    el: Element,
    docID: string,
    index: number,
    onlyRead: boolean
}
const PElement = (props: Props) => {
    const [selectedWord, setSelectedWord] = useState<{id: number, word: string} | null>(null)
    const words = props.el.content!.text!.split(' ')
    const [editMode, setEditMode] = useState<boolean>(false)
    const ref = useRef(null)
    useClickAway(ref, () => {
        setSelectedWord(null)
    })
    // Если включен режим предпросмотра, то выводятся элементы без toolbar
    if (props.onlyRead) {
        return <p ref={ref} className={`${
            props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
            : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
            : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
            : 'text-left'
        }`}>{words.map((word, index) => {
            return <TypedWord key={index} index={index} readOnly={true} setSelectedWord={setSelectedWord} word={word} />
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
                    className="relative cursor-pointer text-neutral-600 bg-neutral-100 py-0.5 px-1 rounded-lg">
                    {`${word} `}
                        <WordToolBar docID={props.docID} el={props.el} index={index} setSelectedWord={setSelectedWord}
                        word={word} words={words}
                        />
                    </span>
                )
                return <TypedWord key={index} index={index} readOnly={false} setSelectedWord={setSelectedWord} word={word} />
            } else {
                return <TypedWord key={index} index={index} readOnly={false} setSelectedWord={setSelectedWord} word={word} />
            }
        })}
        </p>
        {
            editMode &&
            <ParagraphToolBar docID={props.docID} el={props.el} index={props.index} />
        }
    </div> 
}
// type:italic=text
// type:bold=text
export default PElement