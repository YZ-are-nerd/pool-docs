import { Element } from "../../../../../api/types"

type Props = {
    el: Element
}
const H3Element = (props: Props) => {
    return <h3 className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : 'text-right'
    }`}
    >{props.el.content.text}</h3>
}

export default H3Element