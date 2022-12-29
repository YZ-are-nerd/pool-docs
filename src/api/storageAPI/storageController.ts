import { storageModelAPI } from "./storageModel"

export const storageControllerAPI = (() => {
    return {
        getDetailsBucket: async(bucket: string) => {
            const res = await storageModelAPI.getDetailsBucket(bucket)
            return res
        },
        getFile: async(path: string) => {
            const res = await storageModelAPI.getFile(path)
            return res
        },
        updateFile: async(path: string, file: File) => {
            const res = await storageModelAPI.updateFile(path, file)
            return res
        },
        downloadFile: async(path: string) => {
            const res = await storageModelAPI.downloadFile(path)
            return res
        },
        uploadFiles: async(path: string[], files: File[]) => {
            const res = await storageModelAPI.uploadFiles(path, files)
            return res
        },
        uploadFile: async(path: string[], file: File) => {
            const res = await storageModelAPI.uploadFile(path, file)
            return res
        }
    }
})()