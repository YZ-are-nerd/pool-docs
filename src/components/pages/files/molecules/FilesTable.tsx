import { useRecoilValue } from "recoil"
import { User } from "../../../../store/User"
import { UserBucket } from "../../../../store/UserBucket"
import FileInterpreter from "../atoms/FileInterpreter"

const FilesTable = () => {
    const user = useRecoilValue(User)
    const bucket = useRecoilValue(UserBucket(user?.id!))
    return (
        <>
            {bucket?.map((file) => <FileInterpreter key={file.id} fileData={file} />)}
        </>
    )
}
export default FilesTable