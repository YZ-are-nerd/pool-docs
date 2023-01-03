import { BiPlus } from 'react-icons/bi'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { Constructor } from '../../../../store/Constructor'
import { DocAtom } from '../../../../store/Doc'
import { EditMode } from '../../../../store/EditMode'
import Blocks from '../organisms/Blocks'
import { EditorAtom } from '../../../../store/Editor';
import { Doc, Element } from '../../../../api/types'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { supabase } from '../../../../api/client'
import H1Element from '../organisms/renderElements/H1Element'
import H2Element from '../organisms/renderElements/H2Element'
import H3Element from '../organisms/renderElements/H3Element'
import ListElement from '../organisms/renderElements/ListElement'
import PElement from '../organisms/renderElements/PElement'
type Props = {
  docID: string,
  onlyRead: boolean,
}

const Editor: React.FC<Props> = ({docID, onlyRead}) => {
    const [doc, setDoc] = useRecoilState(DocAtom(docID))
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    const [editMode, setEditMode] = useRecoilState(EditMode('editor'))
    const constructor = useRecoilValue(Constructor)
    const wrapperRef = useRef(null)
    const setDocEditor = () => {
      setEditor(doc.data)
    }
    // useClickAway(wrapperRef, () => {
    //   updateDoc()
    // })
    useLayoutEffect(() => {
      setDocEditor()
    },[])
    useEffect(() => {
      supabase
        .channel(`public:documents:id=eq.${doc.id}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'documents', filter: `id=eq.${doc.id}` }, payload => {
            if (payload.new) {
              console.log('Обновление', payload);
              const newDoc = payload.new as Doc 
              setDoc(newDoc)
              setEditor(newDoc.data)
            }
        })
        .subscribe()
    },[])
  return (

      <div ref={wrapperRef} className="max-w-3xl p-3 h-[1000px] w-full rounded-xl flex flex-col gap-1 shadow-lg bg-white">
        {
          editor.map((val, index) => {
            if (val.type === 'h1') return <H1Element onlyRead={onlyRead} docID={docID} index={index} key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'h2') return <H2Element onlyRead={onlyRead} docID={docID} index={index} key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'h3') return <H3Element onlyRead={onlyRead} docID={docID} index={index} key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'p') return <PElement onlyRead={onlyRead} index={index} docID={docID} key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'ul' || val.type === 'ol') return <ListElement key={val.content.text && val.content.text + index} el={val} /> 
          })
        }
        {
          constructor ?
          {...constructor.element}
          : editMode ?
            <Blocks />
          : !onlyRead ?
          <div onClick={() => setEditMode(true)} className="w-1/2 h-10 rounded-xl flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-70">
            <BiPlus className='text-neutral-400' />
            <p className='text-sm'>Добавить</p>
          </div>
          : null
        }
      </div>
    )
}

export default Editor