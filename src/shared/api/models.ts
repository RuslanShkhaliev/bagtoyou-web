import {Tables, TablesInsert, TablesUpdate} from '@api/supabase';

export type Ad = Tables<'ads'>
export type CreateAd = TablesInsert<'ads'>
export type UpdateAd = TablesUpdate<'ads'>
