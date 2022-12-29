import { supabase } from '../client';
export const storageModelAPI = (() => {
    return {
        getDetailsBucket: async(bucket: string) => {
            console.log('path', bucket);
            const { data, error } = await supabase
            .storage
            .from('usersbuckets')
            .list(bucket, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
              })
            console.log(error);
            if (data) return data
            return null
        },
        getFile: async(path: string) => {
            const { data, error } = await supabase
            .storage
            .from('usersbuckets')
            .list(path, {
                limit: 1,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
              })
            console.log(data, error);
            if (data) return data[0]
            return null
        },
        updateFile: async(path: string, file: File) => {
            const { data, error } = await supabase
            .storage
            .from('usersbuckets')
            .update(path, file, {
                cacheControl: '3600',
                upsert: true
            })
            console.log(data, error);
            if (data) return data.path
            return null
        },
        downloadFile: async(path: string) => {
            const { data, error } = await supabase
                .storage
                .from('usersbuckets')
                .download(path)
            if (data) return data
            return null
        },
        uploadFiles: async(path: string[], files: File[]) => {
            const formattedPath = path.join('/')
            const paths: string[] = []
            await files.forEach(async(file) => {
                const { data, error } = await supabase
                .storage
                .from('usersbuckets')
                .upload(`${formattedPath}/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false
                })
                console.log(data, error);
                if (data) paths.push(data.path)
            })
            return paths
        },
        uploadFile: async(path: string[], file: File) => {
            const formattedPath = path.join('/')
            const { data, error } = await supabase
            .storage
            .from('usersbuckets')
            .upload(`${formattedPath}/${file.name}`, file, {
                cacheControl: '3600',
                upsert: false
            })
            console.log(data, error);
            if (data) return data.path
            return null
        }
    }
})()