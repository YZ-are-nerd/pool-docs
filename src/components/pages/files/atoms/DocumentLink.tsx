import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { supabase } from '../../../../api/client'
import { Doc } from '../../../../api/types'
import { DocAtom } from '../../../../store/Doc'
import DocumentHolder from '../../../global/DocumentHolder'
type Props = {
    doc: Doc
}
const DocumentLink: React.FC<Props> = ({doc}) => {
    const [docData, setDoc] = useRecoilState(DocAtom(doc.id))
    useEffect(() => {
        supabase
          .channel(`public:documents:id=eq.${doc.id}onPage`)
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'documents', filter: `id=eq.${doc.id}` }, payload => {
              if (payload.new) {
                const newDoc = payload.new as Doc 
                setDoc(newDoc)
              }
          })
          .subscribe()
      },[])
    return (
        <Link to={`/file/${docData.id}`}
        className="w-full h-full flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-neutral-200 bg-opacity-50 hover:bg-neutral-200">
            <DocumentHolder />
            <p className="line-clamp-1">{docData.title}</p>
        </Link>
    )
}

export default DocumentLink