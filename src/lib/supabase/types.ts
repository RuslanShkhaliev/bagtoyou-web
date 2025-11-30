import { Tables } from './.generated';

export type AdsRow = Tables<'ads'>;
export type ProfilesRow = Tables<'profiles'>;
export type DraftAdRow = Tables<'draft_ads'>;

export type StorageBucket = 'media' | 'avatars';
