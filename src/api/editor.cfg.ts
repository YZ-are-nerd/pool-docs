import Header from 'editorjs-header-with-alignment'
import Paragraph from 'editorjs-paragraph-with-alignment'
import List from '@editorjs/nested-list'
import LinkTool from '@editorjs/link'
import Strikethrough from '@sotaproject/strikethrough'
import Marker from '@editorjs/marker'
export const config = {
    header: Header,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    list: List,
    linkTool: LinkTool,
    strikethrough: Strikethrough,
    Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
    }
}