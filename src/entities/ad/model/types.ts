import { Tables } from '@api/supabase/v1';
import { Category } from '@entities/category';

export type Ad = Tables<'ads'>;
export type CreateAd = {
	title: string;
	category_id: number;
	description: string;
	price: number;
	currency: string;
};
export type AdPreview = {
	id: number;
	title: string;
	preview_image: string;
	is_favorite: boolean;
	price: number;
	currency: string;
	location: string;
	created_at: string;
};
export type AdImage = Tables<'ad_images'>;
export interface AdModel {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	location: string;
	imageUrl: string;
	currency: string;
	is_favorite: boolean;
	images: string[];
	seller: {
		name: string;
		phone: string;
		email: string;
	};
	createdAt: string;
}
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
