import { FileObject } from '@supabase/storage-js'
import { FileType } from '../../../../api/types';
import File from './File';
type Props = {
    fileData: FileObject
}
const FileInterpreter: React.FC<Props> = ({fileData}) => {
    // console.log(fileData);
    console.log(fileData?.metadata?.mimetype);
    const checkFileType = (): FileType  => {
        const parseType = fileData?.metadata?.mimetype
        if (parseType) {
            const isImg = parseType.indexOf('image')
            const isJs = parseType.indexOf('javascript')
            const isHtml = parseType.indexOf('html')
            const isText = parseType.indexOf('plain')
            const isZip = parseType.indexOf('zip')
            if (isImg !== -1) return 'img'
            if (isJs !== -1) return 'file'
            if (isHtml !== -1) return 'file'
            if (isText !== -1) return 'text'
            if (isZip !== -1) return 'zip'
        }
        return 'folder'
    }
    return (
        <File key={'file' + fileData.id} type={checkFileType()} fileData={fileData} />
    )
}

export default FileInterpreter