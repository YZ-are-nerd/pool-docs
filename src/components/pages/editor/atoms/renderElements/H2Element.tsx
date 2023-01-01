import { Element } from "../../../../../api/types"

type Props = {
    el: Element
}
const H2Element = (props: Props) => {
    return <h2 className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : props.el.content.align && props.el.content.align === 'right' ? 'text-right'
        : 'text-left'
    }`}
    >{props.el.content.text}</h2>
}

export default H2Element