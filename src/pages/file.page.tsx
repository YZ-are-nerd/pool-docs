import { DateTime } from "luxon";
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil";
import DocumentPageHolder from "../components/global/DocumentPageHolder";
import { DocAtom } from "../store/Doc";

const FilePage = () => {
    const params = useParams()
    console.log(params);
    const doc = useRecoilValue(DocAtom(params.path!))
    const navigate = useNavigate()
    return (
        <section className="w-full h-full flex flex-col gap-2 overflow-hidden">
            <div className="max-w-2xl gap-2 flex flex-col p-3 h-full w-full mx-auto">
                <div className="w-full h-fit flex items-center justify-between">
                    <div className="w-fit h-fil flex flex-col gap-1">
                        <h1>{doc.title}</h1>
                        <p className="text-sm">Изменено: {DateTime.fromISO(doc.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</p>
                    </div>
                    <button onClick={() => navigate(`/file/${doc.id}/editor`)} 
                    className="py-2 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500">Редактировать</button>
                </div>
                <DocumentPageHolder />
            </div>
        </section>
    )
}

export default FilePage