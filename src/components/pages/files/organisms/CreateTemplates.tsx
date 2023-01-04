import { useRecoilValue } from 'recoil'
import { User } from '../../../../store/User'
import NewDocumentButton from '../molecules/NewDocumentButton'
const CreateTemplates = () => {
  const user = useRecoilValue(User)
  if (!user) {
    return <></>
  }
  return (
    <div className='w-full h-48 rounded-xl p-2 grid grid-rows-1 grid-cols-1 lg:grid-cols-6 bg-neutral-100'>
      <NewDocumentButton />
    </div>
  )
}

export default CreateTemplates