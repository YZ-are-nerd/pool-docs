import React from 'react'
import { useRecoilValue } from 'recoil';
import { documentController } from '../../../../api/documentAPI/documentController';
import { Element } from '../../../../api/types';
import { DocAtom } from '../../../../store/Doc';
type Props = {
    word: string,
    words: string[],
    originWord: string,
    index: number,
    elIndex: number,
    el: Element,
    docID: string
}
const BoldWord: React.FC<Props> = ({word, originWord, index, elIndex, words, el, docID}) => {
  const doc = useRecoilValue(DocAtom(docID))
  const removeDecorator = async(id: number, word: string) => {
    const typedWord = word.split('=')
    const newWords = words.map((word, index) => {
      if (index === id) {
        return typedWord[1]
      }
      return word
    })
    const joinedWords = newWords.join(' ')
    const editedElement: Element = {
        type: el.type,
        content: {
            text: joinedWords,
            align: el.content.align,
        }
    }
    await documentController.updateDocData(doc, doc.data, editedElement, elIndex)
}
  return (
      <b onClick={() => removeDecorator(index, originWord)}>{`${word} `}</b>
  )
}

export default BoldWord