import { FileObject } from "@supabase/storage-js";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { storageControllerAPI } from "../api/storageAPI/storageControllerAPI";
import { FilesToEdit } from "../store/FilesToEdit";
import { PathAtom } from "../store/Path";
import { User } from "../store/User";
const FilePage = () => {
    const params = useParams()
    console.log(params);
    const user = useRecoilValue(User)
    const path = useRecoilValue(PathAtom(user?.id!))
    const formattedPath = path.length > 0 ? path[0] : path.join('/')
    const bucket = useRecoilValue(FilesToEdit(formattedPath))
    const [selectedFile, setSelectedFile] = useState<FileObject | null>()
    const [initialText, setInitialText] = useState<string>('')
    const [text, setText] = useState<string>('')
    console.log(bucket);
    const readText = async(file: FileObject) => {
        const blob = await storageControllerAPI.downloadFile(`${formattedPath}/${file.name}`)
        if (blob) {
            const reader = new FileReader();
            reader.readAsText(blob, 'utf8');
            console.log(reader);
            setTimeout(() => {
                if (reader.result) {
                    setSelectedFile(file)
                    setInitialText(reader.result as string)   
                    setText(reader.result as string)
                }
            }, 1000);
        }
    }
    const saveEditedFile = async() => {
        const editedText = text
        const textFile = new File([editedText], selectedFile?.name!, 
            { lastModified: selectedFile?.metadata?.lastModified , type: selectedFile?.metadata?.mimetype })
        console.log(textFile, textFile.text().then((text) => console.log(text)));
        const updatedFile = await storageControllerAPI.updateFile(`${formattedPath}/${selectedFile?.name}`, textFile)
        if (updatedFile) {
            const updateBlob = await storageControllerAPI.downloadFile(updatedFile)
            if (updateBlob) {
                const reader = new FileReader();
                reader.readAsText(updateBlob, 'utf8');
                console.log(reader);
                setTimeout(() => {
                    if (reader.result) {
                        // setSelectedFile()
                        setInitialText(reader.result as string)   
                        setText(reader.result as string)
                    }
                }, 1000);
            }

        }
        console.log(updatedFile);
    }
    return (
        <section className="w-full h-full p-2 flex flex-col gap-2 bg-black overflow-hidden">
            <div className="w-fit h-fit flex flex-col gap-2">
                <h1 className="text-4xl font-bold">Привет, добро пожаловать в редактор файлов</h1>
                <p>Пока что, сервис поддерживает редактирование только .txt файлов</p>
            </div>
            <div className="w-full h-full flex gap-2">
                <div className="w-1/3 h-full p-2 flex flex-col gap-2 rounded-xl bg-neutral-900">
                    <h4 className="text-lg font-bold">Доступные файлы для редактирования</h4>
                    {
                        bucket && bucket.map((file) => 
                        <div key={file.id} onClick={() => readText(file)} className="w-full h-fit flex items-center justify-between py-1 pr-1 pl-2 rounded-xl bg-neutral-800">
                            <p className="font-bold text-neutral-300">{file.name}</p>
                            <span className="px-2 py-1 text-sm rounded-lg bg-neutral-700">{DateTime.fromISO(file.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</span>
                        </div>
                        )
                    }
                </div>
                <div className="w-full h-full p-2 flex flex-col rounded-xl bg-neutral-900">
                    {
                        selectedFile ?
                        <div className="w-full h-fit flex items-center">
                            <p className="cursor-pointer select-none font-bold text-neutral-300">{selectedFile.name}</p>
                        </div>
                        : null
                    }
                    <pre className="outline-none text-neutral-400" suppressContentEditableWarning={true} contentEditable={true} onBlur={e => setText(e.currentTarget.innerText)}>{text}</pre>
                    {
                        initialText !== text &&
                        <div className="w-full h-10 mt-auto flex gap-2 items-center justify-end">
                            <button onClick={() => setText(initialText)} className="py-1 px-2 rounded-xl font-bold text-neutral-100 bg-neutral-500">Сбросить</button>
                            <button onClick={saveEditedFile} className="py-1 px-2 rounded-xl font-bold text-neutral-100 bg-blue-600">Сохранить</button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default FilePage