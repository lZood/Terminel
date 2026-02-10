import { createClient } from '@supabase/supabase-js'

// Use fallback values during build time when env vars might not be available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface UserProfile {
    id: string
    rfc: string
    nombre: string
    email: string
    telefono: string
    empresa?: string
    created_at: string
    updated_at: string
}

// Auth helper functions
export const authHelpers = {
    // Sign up with email and password
    async signUp(email: string, password: string, userData: {
        rfc: string
        nombre: string
        telefono: string
        empresa?: string
    }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    rfc: userData.rfc,
                    nombre: userData.nombre,
                    telefono: userData.telefono,
                    empresa: userData.empresa,
                }
            }
        })

        return { data, error }
    },

    // Sign in with email and password
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        return { data, error }
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Get current user
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser()
        return { user, error }
    },

    // Get user profile
    async getUserProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        return { data, error }
    },

    // Update user profile
    async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single()

        return { data, error }
    },

    // Send password recovery email
    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        return { data, error }
    },

    // Update password
    async updatePassword(newPassword: string) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        })

        return { data, error }
    }
}
