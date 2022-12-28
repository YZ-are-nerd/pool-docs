import { useLocation } from "react-router-dom"
import FilesSection from "../organisms/FilesSection"
import ProjectSection from "../organisms/ProjectSection"

const SideBar = () => {
    const location = useLocation()
    if (location.pathname !== '/files') {
        return <></>
    } else return (
        <div className='w-64 shrink-0 h-full px-0 hidden lg:flex'>
            <div className="w-full h-full rounded-xl flex flex-col gap-6 p-2 bg-neutral-900">
                <ProjectSection />
                <div className="w-full h-fit flex flex-col gap-2">
                    <FilesSection />
                </div>
            </div>
        </div>
    )
}

export default SideBar