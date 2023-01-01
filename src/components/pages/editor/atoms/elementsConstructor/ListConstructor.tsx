import React, { Suspense, useEffect, useRef, useState } from 'react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiListOl, BiListPlus, BiListUl, BiTrash } from 'react-icons/bi'
import { useClickAway } from 'react-use'
import { useRecoilState } from 'recoil'
import { Element } from '../../../../../api/types'
import { Constructor } from '../../../../../store/Constructor'
import { EditMode } from '../../../../../store/EditMode'
import { EditorAtom } from '../../../../../store/Editor'

const ListConstructor = () => {
    const wrapperRef = useRef(null)
    const [editMode, setEditMode] = useRecoilState(EditMode('editor'))
    const [constructor, setConstructor] = useRecoilState(Constructor)
    const [editor, setEditor] = useRecoilState(EditorAtom('editor'))
    const [listType, setListType] = useState<'ul'|'ol'>('ol')
    const [newListName, setNewListName] = useState<string>('')
    const [addMode, setAddMode] = useState<boolean>(false)
    const [list, setList] = useState<{text: string, id: number}[]>([])
    const inpRef = useRef(null)
    useClickAway(inpRef, () => {
        if (newListName.length === 0) setAddMode(false)
        if (newListName.length > 0) {
            setList([...list, {
                id: list.length !== 0 ? list[list.length - 1].id + 1 : 0,
                text: newListName
            }])
            setNewListName('')
            setAddMode(false)
        } 
    })
    useClickAway(wrapperRef, () => {
    if (list.length === 0) {
        if (newListName.length > 0) {
            setList([...list, {
                id: list.length !== 0 ? list[list.length - 1].id + 1 : 0,
                text: newListName
            }])
            setNewListName('')
            setAddMode(false)
        } 
        setConstructor(null)
        setEditMode(false)
    }
    const listBlock: Element = {
        type: listType,
        content: { list: list }
    }
    setEditor([...editor, listBlock])
    setConstructor(null)
    setEditMode(false)
    });
    useEffect(() => {
        if (list.length === 0) setAddMode(true)
    },[])
  return (
    <div ref={wrapperRef} className='w-full h-fit flex flex-col'>
        <div className="w-full h-fit">
            <Suspense fallback={<></>}>
            {
                listType === 'ol'
                ?
                <ol className='px-5'>
                    {
                        list.map((listItem) => 
                        <li key={listItem.id} className='list-decimal mb-0.5'>
                            <div className="w-full h-full flex items-center justify-between">
                                <span>{listItem.text}</span>
                                <BiTrash size={24} className='p-1 rounded-lg text-red-400 bg-neutral-100'/>
                            </div>
                        </li>
                        )
                    }
                    {addMode && 
                    <li ref={inpRef} className='list-decimal'>
                        <div className="w-full h-full flex items-center justify-between">
                            <input autoFocus={true} placeholder='Введите для добавления' value={newListName} onChange={e => setNewListName(e.target.value)} className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </li>
                    }
                </ol>
                :
                <ul className='px-5'>
                    {
                        list.map((listItem) => 
                        <li key={listItem.id} className='list-disc mb-0.5'>
                            <div className="w-full h-full flex items-center justify-between">
                                <span>{listItem.text}</span>
                                <BiTrash size={24} className='p-1 rounded-lg text-red-400 bg-neutral-100'/>
                            </div>
                        </li>
                        )
                    }
                    {addMode && 
                    <li ref={inpRef} className='list-disc'>
                        <div className="w-full h-full flex items-center justify-between">
                            <input autoFocus={true} placeholder='Введите для добавления' value={newListName} onChange={e => setNewListName(e.target.value)} className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </li>
                    }
                </ul>
            }
            </Suspense>
        </div>
        <div className="w-fit h-fit flex items-center gap-2">
            <div onClick={() => setAddMode(true)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiListPlus size={20} className='text-neutral-400' />
            </div>
            <div onClick={() => setListType('ol')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiListOl size={20} className='text-neutral-400' />
            </div>
            <div onClick={() => setListType('ul')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100">
              <BiListUl size={20} className='text-neutral-400' />
            </div>
        </div>
    </div>
  )
}

export default ListConstructor