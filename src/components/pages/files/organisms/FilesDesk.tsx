import { lazy, Suspense, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { supabase } from "../../../../api/client"
import { documentController } from "../../../../api/documentAPI/documentController"
import DocumentSkeleton from "../../../../skeletons/Document.skeleton"
import { DocsAtom } from "../../../../store/DocsList"
import { User } from "../../../../store/User"
const DocumentLink = lazy(() => import("../atoms/DocumentLink"))

const FilesDesk = () => {
  const user = useRecoilValue(User)
  const [docs, setDocs] = useRecoilState(DocsAtom)
  const getWatchToChanges = async() => {
    if (user) {
      const mbChangetDocs = await documentController.getDocsByOwnerUid(user.id)
      if ((docs && docs.length) !== (mbChangetDocs && mbChangetDocs.length)) setDocs(mbChangetDocs) 
    }
  }
  useEffect(() => {
    if (user) {
      supabase
      .channel(`public:documents:owner_uid=eq.${user?.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'documents', filter: `owner_uid=eq.${user?.id}` }, payload => {
        if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
          getWatchToChanges()
        }
      }) 
      .subscribe()
    }
  },[])
  if (!user) {
    return (
        <div className="w-full h-full flex items-center justify-center">
          <p>Для начала войдите в аккаунт</p>
        </div>
      )
  }
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2 rounded-xl bg-neutral-100">
      <h2>Ваши документы</h2>
        <div className="w-full h-full gap-2 grid grid-cols-2 lg:grid-cols-6 grid-rows-4">
          {
            docs && docs.map((doc) =>
            <Suspense key={doc.id} fallback={<DocumentSkeleton />}>
              <DocumentLink key={doc.id} doc={doc} />
            </Suspense>
            )
          }
        </div>
    </div>
  )
}

export default FilesDesk