import React from 'react'
type Props = {
    word: string,
}
const ItalicWord: React.FC<Props> = ({word}) => {
  return (
    <em>{`${word} `}</em>
  )
}

export default ItalicWord