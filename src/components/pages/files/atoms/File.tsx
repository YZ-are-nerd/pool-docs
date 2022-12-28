import { FileObject } from '@supabase/storage-js'
import { DateTime } from 'luxon';
import { FcAudioFile, FcDocument, FcFile, FcFolder, FcImageFile, FcPackage, FcVideoFile } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FileType } from '../../../../api/types';
import { useSize } from '../../../../hooks/useSize';
import { PathAtom } from '../../../../store/Path';
import { User } from '../../../../store/User';
type Props = {
    fileData: FileObject,
    type: FileType
}
const File: React.FC<Props> = ({fileData, type}) => {
    const realSize = useSize(fileData?.metadata?.size)
    const user = useRecoilValue(User)
    const [path, setPath] = useRecoilState(PathAtom(user?.id!))
    const formattedPath = path.length === 0 ? path[0] : path.join('/')
    switch (type) {
        case 'folder': 
        return (
                <div onClick={() => setPath([...path, fileData.name])} className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 bg-neutral-800 bg-opacity-50 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcFolder size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
            case 'file': 
            return (
                <div className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcFile size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
            case 'img':
            return (
                <div className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcImageFile size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
            case 'video':
            return (
                <div className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcVideoFile size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
            case 'audio':
            return (
                <div className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcAudioFile size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
            case 'text':
            return (
                <Link to={`/file/${path[0]}`} className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcDocument size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </Link>
            )
            case 'zip':
            return (
                <div className="w-full h-10 p-2 flex items-center justify-between gap-2 rounded-xl text-neutral-400 hover:bg-neutral-800">
                    <p className='w-full h-full flex items-center pl-2 gap-2 font-semibold text-neutral-300'>
                        <FcPackage size={20} />
                        {fileData.name}
                    </p>
                    <div className="w-fit h-full shrink-0 flex items-center gap-12">
                        <p className='text-sm'>{fileData?.metadata?.size && realSize}</p>
                        <p className='shrink-0 py-1 px-2 rounded-xl text-sm bg-neutral-700'>
                            {
                                fileData.updated_at ? DateTime.fromISO(fileData.updated_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                                : 'Папка'
                            }
                        </p>
                    </div>
                </div>
            )
    }
}

export default File