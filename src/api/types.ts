export interface UserData {
    id: string,
    username: string,
    created_at: string,
    avatar: string,
    about: string,
}
export type FileType = 'img' | 'file' | 'folder' | 'text' | 'audio' | 'video' | 'zip'
export type Doc = {
  id: string,
  owner_uid: string,
  title: string,
  created_at: string,
  updated_at: string,
  data: Element[]
}
export type Element = {
    type: string,
    content: {
      text?: string,
      list?: {text: string, id: number}[],
      align?: string
    }
  }