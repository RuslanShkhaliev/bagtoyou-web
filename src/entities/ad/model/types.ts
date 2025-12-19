import { Tables } from '@api/supabase/v1';

export type Ad = Tables<'ads'>;
export enum AdType {
	Offer,
	Request,
}

export const AD_TYPE_LABELS: Record<AdType, string> = {
	[AdType.Offer]: 'Предлагаю доставить',
	[AdType.Request]: 'Ищу попутчика',
};

export enum AdStatus {
	Draft = 'draft',
	Moderation = 'moderation',
	Active = 'active',
	Inactive = 'inactive',
	Closed = 'closed',
	Expired = 'expired',
	Rejected = 'rejected',
}

export const AD_STATUS_LABELS: Record<AdStatus, string> = {
	[AdStatus.Draft]: 'Черновик',
	[AdStatus.Moderation]: 'На модерации',
	[AdStatus.Active]: 'Активно',
	[AdStatus.Inactive]: 'Архив',
	[AdStatus.Closed]: 'Закрыто',
	[AdStatus.Expired]: 'Истекло',
	[AdStatus.Rejected]: 'Отклонено',
};

export const AD_STATUS_COLORS: Record<AdStatus, string> = {
	[AdStatus.Draft]: 'bg-gray-100 text-gray-700',
	[AdStatus.Moderation]: 'bg-blue-100 text-blue-700',
	[AdStatus.Active]: 'bg-green-100 text-green-700',
	[AdStatus.Closed]: 'bg-gray-100 text-gray-700',
	[AdStatus.Inactive]: 'bg-gray-100 text-gray-700',
	[AdStatus.Expired]: 'bg-red-100 text-red-700',
	[AdStatus.Rejected]: 'bg-red-100 text-red-700',
};
