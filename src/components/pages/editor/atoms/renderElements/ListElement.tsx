import { Element } from "../../../../../api/types"

type Props = {
    el: Element
}
const ListElement = (props: Props) => {
    if (props.el.type === 'ol') {
        return (
            <ol className='px-5'>
                {
                    props.el.content.list && props.el.content.list.map((el) =>
                    <li key={el.id} className='list-decimal mb-0.5'>{el.text}</li>
                )}
            </ol>
        )
    } else {
        return (
        <ul className='px-5'>
            {
                props.el.content.list && props.el.content.list.map((el) =>
                <li key={el.id} className='list-disc mb-0.5'>{el.text}</li>
            )}
        </ul>
    )}
}

export default ListElement