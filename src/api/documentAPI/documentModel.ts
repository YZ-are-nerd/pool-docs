import { DateTime } from 'luxon';
import { Doc, Element } from '../types';
import { supabase } from './../client';
export const documentModel = (() => {
    return {
        createDocument: async(userID: string) => {
            const { data, error } = await supabase
            .from('documents')
            .insert({
                owner_uid: userID,
                title: 'Новый документ',
                updated_at: DateTime.now().toISO(),
                data: []
            })
            .select()
            .limit(1)
            .single()
            console.log(error);
            return data as Doc
        },
        getDocByDocID: async(docID: string) => {
            const { data, error } = await supabase
            .from('documents')
            .select()
            .eq('id', docID)
            .limit(1)
            .single()
            return data as Doc
        },
        getDocsByOwnerUid: async(owner_uid: string) => {
            const { data, error } = await supabase
            .from('documents')
            .select()
            .eq('owner_uid', owner_uid)
            if (data) return data as Doc[]
            return null
        },
        updateDoc: async(doc: Doc, editorData: Element[]) => {
            const { data, error } = await supabase
            .from('documents')
            .update({
                title: doc.title,
                data: editorData,
                updated_at: DateTime.now().toISO()
            } as Doc)
            .eq('id', doc.id)
            .select()
            console.log(error);
            if (data) return data[0] as Doc
            return null
        },
        updateDocData: async(doc: Doc, editorData: Element[], editedElement: Element, indexOfEditedElement: number) => {
            const editedData = editorData.map((data, index) => {
                if (index === indexOfEditedElement) return editedElement
                return data
            }) 
            const { error } = await supabase
            .from('documents')
            .update({
                data: editedData,
            } as Doc)
            .eq('id', doc.id)
            console.log(error);
        }
    }
})()