import { Helmet } from "react-helmet"
import CreateTemplates from "../components/pages/files/organisms/CreateTemplates"
import FilesDesk from "../components/pages/files/organisms/FilesDesk"

const FilesPage = () => {
  return (
    <section className="w-full h-full flex gap-2 overflow-hidden">
        <Helmet>
            <title>Файлы</title>
        </Helmet>
        <div className="w-full h-full flex flex-col gap-2">
          <CreateTemplates />
          <FilesDesk />
        </div>
    </section>
  )
}

export default FilesPage