import { lazy, Suspense } from "react"
import { Helmet } from "react-helmet"
const CreateTemplates = lazy(() => import("../components/pages/files/organisms/CreateTemplates"))
const FilesDesk = lazy(() => import("../components/pages/files/organisms/FilesDesk"))
import CreateTemplateSkeleton from "../skeletons/CreateTemplate.skeleton"
import FilesDeskSkeleton from "../skeletons/FilesDesk.skeleton"

const FilesPage = () => {
  return (
    <section className="max-w-7xl mx-auto w-full h-full flex gap-2 overflow-hidden">
        <Helmet>
            <title>Файлы</title>
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2">
          <Suspense fallback={<CreateTemplateSkeleton />}>
            <CreateTemplates />
          </Suspense>
          <Suspense fallback={<FilesDeskSkeleton />}>
            <FilesDesk />
          </Suspense>
        </div>
    </section>
  )
}

export default FilesPage