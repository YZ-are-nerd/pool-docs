export interface UserData {
    id: string,
    username: string,
    created_at: string,
    avatar: string,
    about: string,
}
export type FileType = 'img' | 'file' | 'folder' | 'text' | 'audio' | 'video' | 'zip'