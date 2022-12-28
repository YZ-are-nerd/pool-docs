import { Suspense } from "react"
import { Helmet } from "react-helmet"
import FileExplorer from "../components/pages/files/organisms/FileExplorer"
import QuickAccess from "../components/pages/files/organisms/QuickAccess"

const FilesPage = () => {
  return (
    <section className="w-full h-full flex gap-2 bg-black overflow-hidden">
        <Helmet>
            <title>Файлы</title>
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2">
          <Suspense fallback={<></>}>
            <QuickAccess />
          </Suspense>
          <Suspense fallback={<></>}>
            <FileExplorer />
          </Suspense>
        </div>
        <div className="w-1/4 h-full rounded-xl bg-neutral-900">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-center">При нажатии на папку или файл информация будет отображаться тут</p>
          </div>
        </div>
    </section>
  )
}

export default FilesPage