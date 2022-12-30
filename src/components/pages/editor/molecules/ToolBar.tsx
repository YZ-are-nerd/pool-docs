import React from 'react'
import { BiBold, BiFontSize, BiItalic } from 'react-icons/bi'

const ToolBar = () => {
  return (
    <div className="absolute top-14 -right-40 w-36 h-2/3">
        <div className='sticky top-0 right-0 w-full flex items-center gap-1 p-1 h-12 rounded-xl shadow-md bg-white'>
            <div className="w-full h-full rounded-xl flex items-center justify-center group bg-neutral-100">
                <BiBold className='text-neutral-400 group-hover:text-neutral-600' size={24}/>
            </div>
            <div className="w-full h-full rounded-xl flex items-center justify-center group bg-neutral-100">
                <BiItalic className='text-neutral-400 group-hover:text-neutral-600' size={24}/>
            </div>
            <div className="w-full h-full rounded-xl flex items-center justify-center group bg-neutral-100">
                <BiFontSize className='text-neutral-400 group-hover:text-neutral-600' size={24}/>
            </div>
        </div>
    </div>
  )
}

export default ToolBar