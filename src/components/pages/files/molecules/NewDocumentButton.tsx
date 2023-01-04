import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { documentController } from '../../../../api/documentAPI/documentController'
import { User } from '../../../../store/User'
import DocumentHolder from '../../../global/DocumentHolder'

const NewDocumentButton = () => {
    const user = useRecoilValue(User)
    const navigate = useNavigate()
    const addNewDoc = async() => {
        if (user) {
            const createdDoc = await documentController.createDocument(user.id)
            navigate(`/file/${createdDoc.id}`)
        }
    }
  return (
    <div onClick={addNewDoc} className="w-full h-full rounded-xl flex flex-col gap-2 items-center justify-center bg-neutral-200 hover:bg-neutral-300">
        <DocumentHolder />
        <p>Создать новый документ</p>
    </div>
  )
}

export default NewDocumentButton