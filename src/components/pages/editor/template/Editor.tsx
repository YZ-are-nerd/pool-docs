import { BiPlus } from 'react-icons/bi'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { Constructor } from '../../../../store/Constructor'
import { DocAtom } from '../../../../store/Doc'
import { EditMode } from '../../../../store/EditMode'
import Blocks from '../organisms/Blocks'
import { EditorAtom } from '../../../../store/Editor';
import H1Element from '../atoms/renderElements/H1Element'
import H2Element from '../atoms/renderElements/H2Element'
import H3Element from '../atoms/renderElements/H3Element'
import PElement from '../atoms/renderElements/PElement'
import ListElement from '../atoms/renderElements/ListElement'
import { Doc, Element } from '../../../../api/types'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useClickAway } from 'react-use'
import { documentController } from '../../../../api/documentAPI/documentController'
import { supabase } from '../../../../api/client'
type Props = {
  docID: string,
  onlyRead: boolean,
  setWord?: SetterOrUpdater<string>
}

const Editor: React.FC<Props> = ({docID, onlyRead, setWord}) => {
    const [doc, setDoc] = useRecoilState(DocAtom(docID))
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    const [editMode, setEditMode] = useRecoilState(EditMode('editor'))
    const constructor = useRecoilValue(Constructor)
    const initialValue: Element[] = [
      {
        type: 'p',
        content: {
          text: 'Hello'
        }
      },
    ]
    function gText(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.preventDefault();
      const selection = document.getSelection()
      const text = selection?.toString()
      if (text) setWord && setWord(text)
    }
    const wrapperRef = useRef(null)
    const setDocEditor = () => {
      setEditor(doc.data)
    }
    const updateDoc = async() => {
      const updatedDoc = await documentController.updateDoc(doc, editor)
      console.log(updatedDoc);
      if (updatedDoc) {
          setDoc(updatedDoc)
          setEditor(updatedDoc.data)
      }
    }
    useClickAway(wrapperRef, () => {
      updateDoc()
    })
    useLayoutEffect(() => {
      setDocEditor()
    },[])
    useEffect(() => {
      supabase
        .channel(`public:documents:id=eq.${doc.id}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'documents', filter: `id=eq.${doc.id}` }, payload => {
            if (payload.new) {
              console.log('Обновление');
              const newDoc = payload.new as Doc 
              setDoc(newDoc)
              setEditor(newDoc.data)
            }
        })
        .subscribe()
    },[])
  return (

      <div ref={wrapperRef} onClick={updateDoc} className="max-w-3xl p-3 h-[1000px] w-full rounded-xl flex flex-col gap-1 shadow-lg bg-white">
        {
          editor.map((val, index) => {
            if (val.type === 'h1') return <H1Element docID={docID} key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'h2') return <H2Element key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'h3') return <H3Element key={val.content.text && val.content.text + index} el={val} />
            if (val.type === 'p') return <PElement index={index} docID={docID} key={val.content.text && val.content.text + index} el={val} />
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