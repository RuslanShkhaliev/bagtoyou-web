import { Skeleton } from '@shared/ui';

interface SkeletonListProps {
	count?: number;
}

export const SkeletonLoader = ({ count = 5 }: SkeletonListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{Array.from({ length: count }).map((_, index) => (
				<SkeletonItem key={index} />
			))}
		</div>
	);
};

export const SkeletonItem = () => {
	return (
		<div className='flex gap-3 overflow-hidden rounded-lg border bg-card p-3'>
			{/* Изображение слева */}
			<Skeleton className='h-20 w-20 flex-shrink-0 rounded-lg' />

			{/* Контент справа */}
			<div className='flex flex-1 flex-col justify-between gap-2'>
				{/* Верхняя часть: заголовок и цена */}
				<div className='space-y-2'>
					{/* Заголовок */}
					<Skeleton className='h-4 w-full' />

					{/* Цена */}
					<Skeleton className='h-5 w-24' />

					{/* Бейдж типа */}
					<Skeleton className='h-6 w-20 rounded' />
				</div>

				{/* Нижняя часть: дополнительная информация */}
				<div className='flex items-center gap-2'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-3 w-12' />
				</div>
			</div>
		</div>
	);
};
