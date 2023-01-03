import React from 'react'
type Props = {
    word: string
}
const TaggedWord: React.FC<Props> = ({word}) => {
  return (
    <span className="text-blue-500 bg-blue-500 bg-opacity-20 py-0.5 px-1 mr-0.5 rounded-lg">{`${word} `}</span>
  )
}

export default TaggedWord