import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import NavBar from "../components/global/navbar/template/NavBar"
import { User } from "../store/User"

const RootPage = () => {
  const user = useRecoilValue(User)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user && location.pathname !== '/files') navigate('/files')
    if (location.pathname === '/') navigate('/files')
  },[user])
  return (
    <main className="max-w-screen min-h-screen shrink-0 flex flex-col py-2 gap-2 relative bg-neutral-200">
          <NavBar />
          <Outlet />
    </main>
  )
}

export default RootPage