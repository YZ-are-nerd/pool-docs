import { useState } from "react"
import { BiFolder, BiFolderOpen, BiHome } from "react-icons/bi"
import NavBarLink from "../atoms/NavBarLink"
import UserButton from "../molecules/UserButton"
export type Nav = {
    id: number, 
    title: string, 
    link: string,
    iconInActive: JSX.Element, 
    iconActive: JSX.Element
}
const NavBar = () => {
  const navs: Nav[] = [
    {
      id: 1, 
      title: "Главная", 
      link: '/',
      iconInActive: <BiHome className="text-neutral-400" size={20} />, 
      iconActive: <BiHome className="text-blue-500" size={20} />
    },
    {
      id: 2, 
      title: "Файлы", 
      link: '/files',
      iconInActive: <BiFolder className="text-neutral-400" size={20} />, 
      iconActive: <BiFolderOpen className="text-blue-500" size={20} />
    },
  ]
  const [selectedPage, setSelectedPage] = useState<Nav>(navs[0])
  return (
    <div className="w-full h-10 flex items-center justify-between">
      <div className="w-fit h-full flex items-center gap-2">
        {
          navs.map((nav, index) =>
            <NavBarLink navData={nav} setNav={setSelectedPage} key={nav.id} active={selectedPage.id === nav.id ? true : false} 
            link={nav.link} title={nav.title} icon={selectedPage.id === nav.id ? nav.iconActive : nav.iconInActive} />
          )
        }
      </div>
      <div className="w-fit h-full flex items-center">
        <UserButton />
      </div>
    </div>
  )
}

export default NavBar