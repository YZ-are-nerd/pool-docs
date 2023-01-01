import React, { SetStateAction, useLayoutEffect, useRef } from 'react'
type Props = {
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>,
    type: string,
    align: 'left' | 'center' | 'right'
}
const MIN_TEXTAREA_HEIGHT = 0;

const TextArea: React.FC<Props> = ({setValue, type, value, align}) => {
    const typeConverter = type === 'h1' ? 'font-bold text-3xl text-neutral-600'
    : type === 'h2' ? 'font-bold text-2xl text-neutral-600'
    : type === 'h3' ? 'font-bold text-xl text-neutral-600'
    : type === 'p' ? 'font-normal text-base text-neutral-400'
    : ''
    const alignConverter = align === 'left' 
    ? 'text-left'
    : align === 'center'
    ? 'text-center'
    : 'text-right'
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(
              textareaRef.current.scrollHeight,
              MIN_TEXTAREA_HEIGHT
            )}px`;
        }
    }, [value]);
  return (
    <textarea
    className={`w-full min-h-full ${typeConverter} ${alignConverter} max-h-36 overflow-y-auto outline-none bg-transparent`}
    autoFocus={true}
    onChange={e => setValue(e.target.value)}
    ref={textareaRef}
    rows={1}
    placeholder='Введите что-нибудь'
    style={{
      minHeight: MIN_TEXTAREA_HEIGHT,
      resize: "none"
    }}
    value={value}/>
  )
}

export default TextArea