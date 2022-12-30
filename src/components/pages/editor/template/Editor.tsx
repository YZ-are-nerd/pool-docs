import { useCallback, useEffect, useState } from 'react'
import { SetterOrUpdater, useRecoilValue } from 'recoil'
import { DocAtom } from '../../../../store/Doc'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import CodeElement from '../renderElements/CodeElement'
import DefaultElement from '../renderElements/DefaultElement'
type Props = {
  docID: string,
  onlyRead: boolean,
  setWord?: SetterOrUpdater<string>
}
const Editor: React.FC<Props> = ({docID, onlyRead, setWord}) => {
    const doc = useRecoilValue(DocAtom(docID))
    const initialValue = [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const [editor] = useState(() => withReact(createEditor()))
    function gText(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.preventDefault();
      const selection = document.getSelection()
      const text = selection?.toString()
      if (text) setWord && setWord(text)
    }
    const renderElement = useCallback((props: any) => {
      console.log(props);
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }, [])
  return (
    <Slate editor={editor} value={initialValue} >
      <div id='editorjs' onMouseUp={e => gText(e)} className="max-w-3xl p-3 h-[1000px] w-full rounded-xl flex shadow-lg bg-white">
        <Editable
          renderElement={renderElement}
        />
      </div>
    </Slate>
    )
}

export default Editor