import { BaseEditor, Editor, Node, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { ReactEditor } from 'slate-react'
export type CustomElement = { type: string; children: CustomText[] }
export type CustomText = { text: string; bold?: true }
declare module 'slate' {
interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
}
}
type Props = {
    icon?: JSX.Element,
    title?: string,
    format: string
}
const BlockButton: React.FC<Props> = ({format, icon, title}) => {
    const editor = useSlate()
    const toggleBlock = (editor: BaseEditor, format: string) => {
        console.log(editor, format);
        Transforms.setNodes(
            editor as BaseEditor & ReactEditor,
            { type: format },
            { match: n => Editor.isBlock(editor as BaseEditor & ReactEditor, n) }
          )
    }
  return (
    <div onClick={() => toggleBlock(editor, format)} className="w-full h-full rounded-xl flex items-center justify-center group bg-neutral-100">
        {title && <p className='font-bold text-neutral-400 group-hover:text-neutral-600'>{title}</p>}
        {icon && icon}
    </div>
  )
}

export default BlockButton