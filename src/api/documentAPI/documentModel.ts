import { DateTime } from 'luxon';
import { Doc } from '../types';
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
                data: {
                    blocks: [
                        {
                            "type": "header",
                            "data": {
                              "text": "Привет, я Новый документ",
                              "level": 1,
                              "align": "left"
                            }
                        }
                    ]
                }

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
    }
})()