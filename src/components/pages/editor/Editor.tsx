import EditorJS, { OutputData } from '@editorjs/editorjs'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { config } from '../../../api/editor.cfg'
import { DocAtom } from '../../../store/Doc'

type Props = {
  docID: string
}
const Editor: React.FC<Props> = ({docID}) => {
    const doc = useRecoilValue(DocAtom(docID))
    console.log(doc.data);
    const editor = new EditorJS({
        holder: 'editorjs',
        tools: config,
        data: doc.data
    })
    useEffect(() => {
      console.log(editor);
      setTimeout(() => {
          const saved = editor.save()
          editor.on('change', (data) => console.log(data))
          console.log(saved.then((data) => console.log(data)));
      }, 1000);
    },[])
  return (
    <div id='editorjs' className="max-w-2xl p-3 h-full w-full rounded-xl flex shadow-lg bg-white">
    </div>
  )
}

export default Editor