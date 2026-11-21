import { supabase } from './supabase';

export const getEventBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error al consultar evento:', error);
        throw error;
    }

    return data;
};