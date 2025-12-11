import {Tables, TablesInsert, TablesUpdate} from '@api/supabase/v1';

export type Ad = Tables<'ads'>
export type CreateAd = TablesInsert<'ads'>
export type UpdateAd = TablesUpdate<'ads'>
