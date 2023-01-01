import { Element } from "../../../../../api/types"

type Props = {
    el: Element
}
const H1Element = (props: Props) => {
    return <h1 className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : 'text-right'
    }`}
    >{props.el.content.text}</h1>
}

export default H1Element