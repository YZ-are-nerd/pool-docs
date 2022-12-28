import React, { SetStateAction } from 'react'
import { BiUpload } from 'react-icons/bi';
import { useDropArea } from 'react-use';
type Props = {
    setEnableDropZone: React.Dispatch<SetStateAction<boolean>>,
    filesUploader: (files: File[]) => Promise<void>
}
const DropZone: React.FC<Props> = ({setEnableDropZone, filesUploader}) => {
    const fileUpLoader = async(files: File[]) => {
        await filesUploader(files)
        setEnableDropZone(false)
    }
    const [bond, state] = useDropArea({
        onFiles: files => {
            fileUpLoader(files)
        },
        onUri: uri => console.log('uri', uri),
        onText: text => console.log('text', text),
      });
    const dragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log('something out');
        setEnableDropZone(false)
    }

    return (
        <div {...bond} 
        onDragLeave={e => dragOverHandle(e)}
        className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-neutral-900 border-neutral-600 hover:border-neutral-500 hover:bg-neutral-800">
            <div className="flex flex-col items-center gap-2">
                <BiUpload className='text-neutral-400' size={36} />
                <p>Бросайте, я поймаю</p>
            </div>
        </div>
    )
}

export default DropZone