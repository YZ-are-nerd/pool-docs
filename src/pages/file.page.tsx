import { DateTime } from "luxon";
import { Helmet } from "react-helmet";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { documentController } from "../api/documentAPI/documentController";
import Editor from "../components/pages/editor/template/Editor";
import { DocAtom } from "../store/Doc";

const FilePage = () => {
    const params = useParams()
    const doc = useRecoilValue(DocAtom(params.path!))
    const navigate = useNavigate()
    const getDeleteDoc = async() => {
        await documentController.deleteDoc(doc)
        navigate(`/files`)

    }
    return (
        <section className="w-full h-full flex flex-col gap-2">
            <Helmet>
                <title>{doc.title}</title>
            </Helmet>
            <div className="max-w-3xl gap-2 flex flex-col p-3 h-full w-full mx-auto">
                <div className="w-full h-fit flex items-center justify-between">
                    <div className="w-fit h-fil flex flex-col gap-1">
                        <h1>{doc.title}</h1>
                        <p className="text-sm">Изменено: {DateTime.fromISO(doc.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</p>
                    </div>
                    <div className="w-fit h-fit flex items-center">
                        <button onClick={() => navigate(`/file/${doc.id}/editor`)} 
                        className="py-2 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500"><BiEdit/></button>
                        <button onClick={getDeleteDoc} 
                        className="py-2 px-4 rounded-xl text-white bg-red-600 hover:bg-red-500"><BiTrashAlt/></button>
                    </div>
                </div>
                <Editor onlyRead={true} docID={params.path!} />
            </div>
        </section>
    )
}

export default FilePage