import React from 'react'
type Props = {
    word: string
}
const BoldWord: React.FC<Props> = ({word}) => {
  return (
    <b>{`${word} `}</b>
  )
}

export default BoldWord