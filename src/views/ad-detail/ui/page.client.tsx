'use client';
import { useAdPermissions } from '@entities/ad/hooks/use-ad-permissions';
import { AdDetail } from '@entities/ad/ui/ad-detail';
import { AdActionsMenu } from '@features/ad-actions/ui/ad-actions-menu';
import { Button } from '@shared/ui';
import { useDeleteAd, useGetAdById } from '@views/ad-detail/api/queries';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

export const AdPage = () => {
	const params = useParams();
	const router = useRouter();

	const adId = Number(params.id);

	const { data: ad, isLoading } = useGetAdById(adId);

	useEffect(() => {
		console.log(ad);
	}, [ad]);

	const permissions = useAdPermissions(
		ad,
		'769bd620-0ba9-4f68-ba6a-4317b5b0eac0',
	);

	const handleBack = () => {
		router.back();
	};

	const handleEdit = () => {
		router.push(`/ads/${adId}/edit`);
	};

	const { mutate: deleteMutate } = useDeleteAd();

	const handleDelete = async () => {
		if (!confirm('Вы уверены, что хотите удалить объявление?')) {
			return;
		}

		deleteMutate(adId, {
			onSuccess: () => {
				router.push('/my-ads');
			},
		});
	};

	const handleClose = async () => {
		console.log('Close');
	};

	const handleRespond = () => {
		router.push(`/ads/${adId}/respond`);
	};

	const handleAddToFavorites = async () => {
		// Реализация добавления в избранное
		console.log('Add to favorites');
	};

	const handleShare = async () => {
		if (navigator.share) {
			await navigator.share({
				title: ad.title,
				text: ad.description,
				url: window.location.href,
			});
		}
	};

	const handleLogin = () => {
		router.push('/auth/login');
	};

	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	return (
		<div className='container mx-auto max-w-4xl px-4 py-6'>
			{/* Навигация */}
			<div className='mb-6'>
				<Button
					variant='ghost'
					size='sm'
					onClick={handleBack}
					className='gap-2'
				>
					<ArrowLeft className='h-4 w-4' />
					Назад
				</Button>
			</div>
			{/* Детали объявления */}
			<AdDetail
				ad={ad}
				permissions={permissions}
				renderActions={() => (
					<AdActionsMenu
						permissions={permissions}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onClose={handleClose}
						onRespond={handleRespond}
						onAddToFavorites={handleAddToFavorites}
						onShare={handleShare}
					/>
				)}
				renderAuthPrompt={() => (
					<div className='flex flex-col items-center gap-4 py-6 text-center'>
						<LogIn className='h-12 w-12 text-muted-foreground' />
						<div className='space-y-2'>
							<h3 className='text-lg font-semibold'>
								Войдите, чтобы откликнуться
							</h3>
							<p className='text-sm text-muted-foreground'>
								Авторизуйтесь для возможности откликнуться на
								объявление
							</p>
						</div>
						<Button
							onClick={handleLogin}
							size='lg'
						>
							Войти
						</Button>
					</div>
				)}
			/>

			{/* Кнопка отклика для мобильных */}
			{permissions.canRespond && (
				<div className='fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:hidden'>
					<Button
						onClick={handleRespond}
						size='lg'
						className='w-full'
					>
						Откликнуться
					</Button>
				</div>
			)}
		</div>
	);
};
