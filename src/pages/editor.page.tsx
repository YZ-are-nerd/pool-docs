import { DateTime } from "luxon"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Editor from "../components/pages/editor/Editor"
import { DocAtom } from "../store/Doc"

const EditorPage = () => {
    const params = useParams()
    console.log(params);
    const doc = useRecoilValue(DocAtom(params.path!))
    return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className="max-w-2xl w-full h-full flex flex-col gap-2">
            <div className="w-full h-fit flex items-center justify-between">
                <h1>{doc.title}</h1>
                <button className="py-2 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500">Сохранить</button>
            </div>
            <Editor docID={params.path!} />
        </div>
    </div>
    )
}

export default EditorPage