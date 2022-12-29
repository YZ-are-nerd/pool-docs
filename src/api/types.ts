import { OutputData } from "@editorjs/editorjs"

export interface UserData {
    id: string,
    username: string,
    created_at: string,
    avatar: string,
    about: string,
}
export type FileType = 'img' | 'file' | 'folder' | 'text' | 'audio' | 'video' | 'zip'
export interface Doc {
    id: string,
    owner_uid: string,
    title: string,
    created_at: string,
    updated_at: string,
    data: OutputData
}