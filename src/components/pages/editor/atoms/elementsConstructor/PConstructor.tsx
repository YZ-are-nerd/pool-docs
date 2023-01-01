import React, { useLayoutEffect, useRef, useState } from 'react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from 'react-icons/bi';
import { useClickAway } from 'react-use';
import { useRecoilState } from 'recoil';
import { Element } from '../../../../../api/types';
import { Constructor } from '../../../../../store/Constructor';
import { EditMode } from '../../../../../store/EditMode';
import { EditorAtom } from '../../../../../store/Editor';
import TextArea from '../TextArea';
const PConstructor = () => {
    const wrapperRef = useRef(null)
    const [value, setValue] = useState('')
    const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')
    const [editMode, setEditMode] = useRecoilState(EditMode('editor'))
    const [constructor, setConstructor] = useRecoilState(Constructor)
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    useClickAway(wrapperRef, () => {
      if (value.length > 0) {
        console.log('Можно создавать блок');
        const h1Block: Element = {
          type: 'p',
          content: {
            text: value,
            align: align
          }
        }
        setEditor([...editor, h1Block])
        setConstructor(null)
        setEditMode(false)
        setValue('')
      }
      console.log('OUTSIDE CLICKED');
    });
    return (
        <div ref={wrapperRef} className='w-full h-fit flex flex-col'>
        <TextArea align={align} setValue={setValue} type='p' value={value} />
          <div className="w-fit h-fit flex items-center gap-2">
            <div onClick={() => setAlign('left')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiAlignLeft size={20} className='text-neutral-400' />
            </div>
            <div onClick={() => setAlign('center')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiAlignMiddle size={20} className='text-neutral-400' />
            </div>
            <div onClick={() => setAlign('right')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiAlignRight size={20} className='text-neutral-400' />
            </div>
          </div>
      </div>
    );
}

export default PConstructor