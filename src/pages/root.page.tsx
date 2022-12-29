import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/global/navbar/template/NavBar"
import SideBar from "../components/global/sideBar/template/SideBar"
import HomePage from "./home.page"

const RootPage = () => {
  const location = useLocation()
  return (
    <main className="w-screen h-screen flex p-2 gap-2 relative bg-neutral-200">
        {location.pathname === '/' && <img loading="lazy" className='absolute top-0 left-0 z-0 w-screen h-screen object-cover' src="/img/main_page.svg" alt="" />}
        <SideBar/>
        <section className={`${location.pathname === '/' && 'max-w-7xl mx-auto'} z-10 w-full h-full flex flex-col gap-2`}>
          <NavBar />
          {
            location.pathname === '/'
            ? <HomePage/>
            : <Outlet />
          }
        </section>
    </main>
  )
}

export default RootPage