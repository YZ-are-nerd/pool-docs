import { useRecoilValue } from "recoil"

const ProjectSection = () => {
    return (
        <div className="w-full h-12 p-1 rounded-xl bg-neutral-800">
            <div className="w-fit h-full flex items-center gap-1">
                <img className="w-full h-full object-fill" src="/pool/x36/pool_primary.svg" alt="" />
                <h1 className="text-4xl font-bold">Docs</h1>
            </div>
        </div>
    )
}

export default ProjectSection