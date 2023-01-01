import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import ToolBar from "../components/pages/editor/molecules/ToolBar"
import Editor from "../components/pages/editor/template/Editor"
import { DocAtom } from "../store/Doc"
import { EditorAtom } from "../store/Editor"
import { SelectedWord } from "../store/SelectedWord"

const EditorPage = () => {
    const params = useParams()
    const doc = useRecoilValue(DocAtom(params.path!))
    const [word, setWord] = useRecoilState(SelectedWord(''))
    const editor = useRecoilValue(EditorAtom('editor'))
    return (
    <div className='w-full h-full relative flex flex-col items-center justify-center'>
        <div className="max-w-3xl relative w-full h-full flex flex-col gap-2">
            <div className="w-full h-fit flex items-center justify-between">
                <h1>{doc.title}</h1>
                {/* <button className="py-2 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500">Сохранить</button> */}
            </div>
            <Editor setWord={setWord} onlyRead={false} docID={params.path!} />
        </div>
    </div>
    )
}

export default EditorPage