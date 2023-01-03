import { useRef } from "react"
import { BiListOl, BiListUl } from "react-icons/bi"
import { useClickAway } from "react-use"
import { useSetRecoilState } from "recoil"
import { Constructor } from "../../../../store/Constructor"
import { EditMode } from "../../../../store/EditMode"
import H1Constructor from "./elementsConstructor/H1Constructor"
import H2Constructor from "./elementsConstructor/H2Constructor"
import H3Constructor from "./elementsConstructor/H3Constructor"
import ListConstructor from "./elementsConstructor/ListConstructor"
import PConstructor from "./elementsConstructor/PConstructor"

const Blocks = () => {
    const setEditMode = useSetRecoilState(EditMode('editor'))
    const setConstructor = useSetRecoilState(Constructor)
    const wrapperRef = useRef(null)
        useClickAway(wrapperRef, () => {
        setEditMode(false)
      });
    return (
        <div ref={wrapperRef} className='w-full h-48 rounded-xl border-2 p-2 gap-2 grid grid-cols-4 grid-rows-2 border-neutral-100'>
            <div onClick={() => setConstructor({type: 'h1', element: <H1Constructor/>})} className="w-full h-full flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <p className='font-bold'>H1</p>
            </div>
            <div onClick={() => setConstructor({type: 'h2', element: <H2Constructor/>})} className="w-full h-full flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <p className='font-bold'>H2</p>
            </div>
            <div onClick={() => setConstructor({type: 'h3', element: <H3Constructor/>})} className="w-full h-full flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <p className='font-bold'>H3</p>
            </div>
            <div onClick={() => setConstructor({type: 'p', element: <PConstructor/>})} className="w-full h-full flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <p className='font-bold'>Text</p>
            </div>
            <div onClick={() => setConstructor({type: 'list', element: <ListConstructor/>})} className="w-full h-full flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <BiListUl size={36} className='text-neutral-400'/>
            </div>
            <div className="w-full h-full col-span-3 flex items-center justify-center gap-2 rounded-xl bg-neutral-100">
                <p className='font-bold'>Soon</p>
            </div>
        </div>
    )
}
export default Blocks