import { BiBold, BiFontSize, BiItalic } from 'react-icons/bi'
import BlockButton from '../atoms/BlockButton'

const ToolBar = () => {

    return (
        <div className="absolute top-14 -right-40 w-36 h-2/3">
            <div className='sticky top-0 right-0 w-full flex flex-col items-center gap-1 p-1 h-fit rounded-xl shadow-md bg-white'>
                <div className="w-full h-10 flex items-center gap-1">
                    <BlockButton format='h1' key='btn-format-h1' title='H1' />
                    <BlockButton format='h2' key='btn-format-h2' title='H2' />
                    <BlockButton format='h3' key='btn-format-h3' title='H3' />
                </div>
                <div className="w-full h-10 flex items-center gap-1">
                    <BlockButton format='bold' key='btn-format-bold' icon={<BiBold className='text-neutral-400 group-hover:text-neutral-600' size={24}/>} />
                    <BlockButton format='italic' key='btn-format-italic' icon={<BiItalic className='text-neutral-400 group-hover:text-neutral-600' size={24}/>} />
                    <BlockButton format='test' key='btn-format-test' icon={<BiFontSize className='text-neutral-400 group-hover:text-neutral-600' size={24}/>} />
                </div>
            </div>
        </div>
    )
}

export default ToolBar