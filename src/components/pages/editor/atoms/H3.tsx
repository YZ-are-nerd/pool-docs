import React, { SetStateAction } from 'react'
import { Element } from '../../../../api/types'
type Props = {
    setEditMode?: React.Dispatch<SetStateAction<boolean>>,
    el: Element,
}
const H3: React.FC<Props> = ({setEditMode, el}) => {
  return (
    <h3 onMouseEnter={() => setEditMode && setEditMode(true)} className={`${
        el.content.align && el.content.align === 'left' ? 'text-left' 
        : el.content.align && el.content.align === 'center' ? 'text-center'
        : el.content.align && el.content.align === 'right' ? 'text-right'
        : 'text-left'
    }`}
    >{el.content.text}</h3>
  )
}
export default H3