import { BiFolder, BiHeart, BiHistory } from "react-icons/bi"
import SideBarButton from "../molecules/SideBarButton"

const FilesSection = () => {
  return (
    <div className="w-full h-fit py-1 flex flex-col gap-2">
        <SideBarButton key={1} link='1' title='Все файлы' icon={<BiFolder className="text-neutral-400" size={18} />}  />
        <SideBarButton key={2} link='1' title='Последние' icon={<BiHistory className="text-neutral-400" size={18} />}  />
        <SideBarButton key={3} link='1' title='Избранные' icon={<BiHeart className="text-neutral-400" size={18} />}  />
    </div>
  )
}

export default FilesSection