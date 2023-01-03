import { useState } from "react"
import { Element } from "../../../../../api/types"
import H1 from "../../atoms/H1"
import HeadersToolBar from "../../molecules/HeadersToolBar"

type Props = {
    el: Element,
    docID: string,
    onlyRead: boolean,
    index: number
}
const H1Element = (props: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    if (props.onlyRead) {
        return <H1 key={'only-read ' + props.el.content?.text + 'H1' + props.index} el={props.el} />
    }
    if (editMode) {
        return (
        <div onMouseLeave={() => setEditMode(false)} className="w-full h-fit flex items-center gap-2">
            <H1 key={'only-read ' + props.el.content?.text + 'H1' + props.index} el={props.el} />
            <HeadersToolBar key={'H1-toolBar'} docID={props.docID} el={props.el} index={props.index}  />
        </div>
    )
    } return <H1 key={'only-read ' + props.el.content?.text + 'H1' + props.index} el={props.el} setEditMode={setEditMode} />
}

export default H1Element