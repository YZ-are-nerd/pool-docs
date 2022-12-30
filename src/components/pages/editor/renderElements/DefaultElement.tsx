import React, { ReactNode } from 'react'
type Props = {
    attributes: React.Attributes,
    children: ReactNode
}
const DefaultElement = (props: Props) => {
    return <p {...props.attributes}>{props.children}</p>
}

export default DefaultElement