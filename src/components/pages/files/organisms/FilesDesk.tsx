import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { DocsAtom } from "../../../../store/DocsList"
import DocumentHolder from "../../../global/DocumentHolder"

const FilesDesk = () => {
  const docs = useRecoilValue(DocsAtom)
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2 rounded-xl bg-neutral-100">
      <h2>Ваши документы</h2>
      <div className="w-full h-full gap-2 grid grid-cols-2 lg:grid-cols-6 grid-rows-4">
        {
          docs && docs.map((doc) =>
          <Link to={`/file/${doc.id}`} key={doc.id} 
          className="w-full h-full flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-neutral-200 bg-opacity-50 hover:bg-neutral-200">
            <DocumentHolder />
            <p className="line-clamp-1">{doc.title}</p>
          </Link>
          )
        }
      </div>
    </div>
  )
}

export default FilesDesk