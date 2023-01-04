import { supabase } from './client';
import { UserData } from './types';


export const modelAPI = (() => {
    return {
        signIn: async() => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
        },
        signOut: async() => {
            const { error } = await supabase.auth.signOut()
        },
        getUserByID: async(id: string) => {
            const { data, error } = await supabase
            .from('users')
            .select()
            .eq('id', id)
            .limit(1)
            .single()
            if (data) return data as UserData
            return null
        },
        checkUserExistsByID: async(uid: string) => {
            const { data, error } = await supabase
            .from('users')
            .select("*")
            .eq('id', uid)
            .limit(1)
            .single()
            if (!error) {
                return data as UserData
            }
            return null
        },
        checkProfile: async() => {
            const sessionToCheck = await supabase.auth.getSession().then(({ data: { session } }) => {
                return session
            })
            if (sessionToCheck) {
                const checkedUser = await modelAPI.checkUserExistsByID(sessionToCheck.user.id!) 
                if (!checkedUser) {
                    const { data, error } = await supabase
                    .from('users')
                    .insert({
                        id: sessionToCheck.user.id,
                        avatar: sessionToCheck.user.user_metadata?.avatar_url,
                        username: sessionToCheck.user.user_metadata?.full_name,
                        about: `Привет, я ${sessionToCheck.user.user_metadata?.full_name}`,
                    })
                    .select()
                    .limit(1)
                    .single()
                    return data as UserData
                } else {
                    if (checkedUser) return checkedUser
                }
            }
            return null
        }
    }
})()