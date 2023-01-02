import { useState } from "react"
import { Helmet } from "react-helmet"
import { BiPencil, BiSave, BiX } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { documentController } from "../api/documentAPI/documentController"
import Editor from "../components/pages/editor/template/Editor"
import { DocAtom } from "../store/Doc"
import { EditorAtom } from "../store/Editor"

const EditorPage = () => {
    const params = useParams()
    const doc = useRecoilValue(DocAtom(params.path!))
    const editor = useRecoilValue(EditorAtom('editor'))
    const [docName, setDocName] = useState<string>(doc.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [readMode, setReadMode] = useState<boolean>(false)
    const updateTitle = async() => {
        await documentController.updateDocTitle(doc, docName)
        setEditMode(false)
    }
    return (
    <div className='w-full h-full relative flex flex-col items-center justify-center'>
        <Helmet>
            <title>{doc.title}</title>
        </Helmet>
        <div className="max-w-3xl relative w-full h-full flex flex-col gap-2">
            <div className="w-full h-fit flex items-center justify-between">
                {
                    !editMode
                    ?
                    <div className="w-fit h-fit flex items-center gap-2">
                        <h1>{doc.title}</h1>
                        <button onClick={() => setEditMode(true)} className="p-1 rounded-lg mt-1 bg-neutral-100"><BiPencil/></button>
                    </div>
                    :
                    <div className="w-1/2 h-fit flex items-center gap-2">
                        <input value={docName} onChange={e => setDocName(e.target.value)} 
                        className="w-full font-bold text-4xl outline-none text-neutral-700 bg-transparent" type="text" />
                        <button onClick={docName === doc.title ? () => setEditMode(false) : () => updateTitle()} className="p-1 rounded-lg mt-1 bg-neutral-100">
                            {
                                docName === doc.title ?
                                <BiX/>
                                :<BiSave/>
                            }
                        </button>
                    </div>
                }
                <button onClick={() => setReadMode(!readMode)} className={`py-1 px-1.5 rounded-xl ${readMode ? 'bg-blue-500 text-white' : 'bg-neutral-100'} `}>Предпросмотр</button>
            </div>
            <Editor onlyRead={readMode} docID={params.path!} />
        </div>
    </div>
    )
}

export default EditorPage