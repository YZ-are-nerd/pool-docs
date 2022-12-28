import { BiChevronRight } from 'react-icons/bi'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PathAtom } from '../../../../store/Path'
import { User } from '../../../../store/User'
import { UserBucket } from '../../../../store/UserBucket'
import FilesTable from '../molecules/FilesTable'
import lodash from 'lodash'
import { useState } from 'react'
import DropZone from '../molecules/DropZone'
import { storageControllerAPI } from '../../../../api/storageAPI/storageControllerAPI'
const FileExplorer = () => {
    const user = useRecoilValue(User)
    const [bucket, setBucket] = useRecoilState(UserBucket(user?.id!))
    const [path, setPath] = useRecoilState(PathAtom(user?.id!))
    const [enableDropZone, setEnableDropZone] = useState<boolean>(false)
    const getFolder = (pathname: string) => {
        const getIndexOfSelectedPath = path.indexOf(pathname)
        const countToCut = getIndexOfSelectedPath === 0 ? path.length - 1 : getIndexOfSelectedPath
        const cuttedPath = lodash.dropRight(path, countToCut)
        console.log(getIndexOfSelectedPath, cuttedPath);
        setPath(cuttedPath)
    }
    const filesUploader = async(files: File[]) => {
        await files.forEach(async(file) => {
            const uploadedPath = await storageControllerAPI.uploadFile(path, file)
            if (uploadedPath) {
                const formattedPath = path.length === 1 ? path[0] : path.join('/')
                const checkBucket = await storageControllerAPI.getDetailsBucket(formattedPath)
                console.log(checkBucket, bucket);
                if (checkBucket?.length !== bucket?.length) setBucket(checkBucket)
            }
        })
    }
    if (enableDropZone) {
        return <DropZone filesUploader={filesUploader} setEnableDropZone={setEnableDropZone} />
    } else return (
        <div onDragOver={() => setEnableDropZone(true)} className="w-full h-full p-3 flex flex-col rounded-xl gap-2 bg-neutral-900">
            <div className="w-full h-fit flex items-center gap-2">
            {
                path.map((pathName, index, arr) =>
                <div key={pathName + index} onClick={() => getFolder(pathName)} className="w-fit h-full flex items-center gap-1">
                    <h2 className={`text-2xl font-bold ${(index + 1 === arr.length && 'text-blue-500')} py-1 px-2 cursor-pointer rounded-xl hover:bg-neutral-800`}>
                        {pathName}
                        {(bucket && index + 1 === arr.length) && <span className='text-blue-500'> ({bucket.length})</span>}
                    </h2>
                    {(arr.length > 1 && index + 1 !== arr.length) && <BiChevronRight className='text-neutral-500' size={24} />}
                </div>
            )}
            </div>
            <div className="w-full h-full flex flex-col gap-2">
                {
                    !bucket || bucket.length === 0 ? <div className="w-full h-full flex items-center justify-center">
                        <p>У вас нет загруженных файлов</p>
                    </div>
                    : 
                    <FilesTable />
                }
            </div>
        </div>
    )
}

export default FileExplorer