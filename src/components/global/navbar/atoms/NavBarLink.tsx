import { SetStateAction } from "react"
import { Link, useLocation } from "react-router-dom"
import { Nav } from "../template/NavBar"

type Props = {
    navData: Nav,
    setNav: React.Dispatch<SetStateAction<Nav>>
    title: string,
    icon: JSX.Element,
    link: string,
    active: boolean
}
const NavBarLink: React.FC<Props> = ({title, icon, link, active, navData, setNav}) => {
  const location = useLocation()
  if (location.pathname === '/') {
    return (
      <Link to={link} onClick={() => setNav(navData)} className="w-fit h-full px-6 py-1 rounded-xl flex items-center gap-1 bg-white bg-opacity-10 hover:bg-opacity-80 backdrop-blur-md">
        {icon}
        <p className={`text-sm mt-0.5 ${active ? 'text-blue-500': 'text-neutral-400'}`}>{title}</p>
    </Link>
    )
  } else return (
    <Link to={link} onClick={() => setNav(navData)} className="w-fit h-full px-6 py-1 rounded-xl flex items-center gap-1 bg-neutral-100">
        {icon}
        <p className={`text-sm mt-0.5 ${active ? 'text-blue-500': 'text-neutral-400'}`}>{title}</p>
    </Link>
  )
}

export default NavBarLink