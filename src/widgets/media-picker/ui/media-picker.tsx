import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

interface MediaPickerProps {
	media?: string[];
	maxFiles?: number;
	onSelect?: (files: FileList | null) => void;
	onChange?: (files: string[]) => void;
	onRemove?: (fileUrl: string) => void;
}

const DEFAULT_MAX_FILES = 5;

export const MediaPicker: FC<MediaPickerProps> = ({
	media = [],
	maxFiles = DEFAULT_MAX_FILES,
	onSelect,
	onChange,
	onRemove,
}) => {
	const [previewUrls, setPreviewUrls] = useState<string[]>(media || []);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const mediaCount = previewUrls.length || 0;
	const canAddMore = mediaCount < maxFiles;

	useEffect(() => {
		console.log(previewUrls, 'urls');
		onChange?.(previewUrls);
	}, [previewUrls]);

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return;
		if (previewUrls.length >= maxFiles) {
			return;
		}
		const newUrls = Array.from(files, (file) => URL.createObjectURL(file));
		setPreviewUrls((prev) => [...prev, ...newUrls].slice(0, maxFiles));
		onSelect?.(files);
	};

	const handleRemoveImage = (index: number) => {
		setPreviewUrls((urls) => urls.filter((_, i) => i !== index));
		try {
			URL.revokeObjectURL(previewUrls[index]);
		} catch (err) {
			console.error('Error reversing object URL:', err);
		}
		onRemove?.(previewUrls[index]!);
	};

	return (
		<div className='grid grid-cols-3 gap-3'>
			{previewUrls.map((url, index) => (
				<div
					key={index}
					className='relative aspect-square rounded-lg overflow-hidden border bg-muted'
				>
					<Image
						src={url}
						alt={`Фото ${index + 1}`}
						fill
						className='object-cover'
					/>
					<button
						type='button'
						onClick={() => handleRemoveImage(index)}
						className='absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90'
					>
						<X className='h-4 w-4' />
					</button>
				</div>
			))}

			<button
				type='button'
				disabled={!canAddMore}
				onClick={() => fileInputRef.current?.click()}
				className='aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-2 transition-colors'
			>
				<ImagePlus className='h-8 w-8 text-muted-foreground' />
				<span className='text-xs text-muted-foreground'>Добавить</span>
			</button>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				multiple
				className='hidden'
				onChange={(e) => handleFileSelect(e.target.files)}
			/>
		</div>
	);
};
