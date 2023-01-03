import { useState } from "react"
import { Element } from "../../../../../api/types"
import H3 from "../../atoms/H3"
import HeadersToolBar from "../../molecules/HeadersToolBar"

type Props = {
    el: Element,
    docID: string,
    onlyRead: boolean,
    index: number
}
const H3Element = (props: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    if (props.onlyRead) {
        return <H3 key={'only-read ' + props.el.content?.text + 'H3' + props.index} el={props.el} />
    }
    if (editMode) {
        return (
        <div onMouseLeave={() => setEditMode(false)} className="w-full h-fit flex items-center gap-2">
            <H3 key={'only-read ' + props.el.content?.text + 'H3' + props.index} el={props.el} />
            <HeadersToolBar key={'H3-toolBar'} docID={props.docID} el={props.el} index={props.index}  />
        </div>
    )
    } return <H3 key={'only-read ' + props.el.content?.text + 'H3' + props.index} el={props.el} setEditMode={setEditMode} />
}

export default H3Element