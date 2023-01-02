import { lazy, Suspense } from "react"
import { useRecoilValue } from "recoil"
import DocumentSkeleton from "../../../../skeletons/Document.skeleton"
import { DocsAtom } from "../../../../store/DocsList"
const DocumentLink = lazy(() => import("../atoms/DocumentLink"))

const FilesDesk = () => {
  const docs = useRecoilValue(DocsAtom)
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