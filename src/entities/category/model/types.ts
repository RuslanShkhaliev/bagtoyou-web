import { Tables } from '@api/supabase/v1';

export type Category = Tables<'categories'>;
export type MappedCategory = Category & { children: Category[] };
