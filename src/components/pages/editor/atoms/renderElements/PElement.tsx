import { Element } from "../../../../../api/types"

type Props = {
    el: Element
}
const PElement = (props: Props) => {
    return <p className={`${
        props.el.content.align && props.el.content.align === 'left' ? 'text-left' 
        : props.el.content.align && props.el.content.align === 'center' ? 'text-center'
        : 'text-right'
    }`}
    >{props.el.content.text}</p>
}

export default PElement