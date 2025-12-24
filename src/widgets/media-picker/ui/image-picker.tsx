import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

const DEFAULT_MAX_FILES = 5;

interface ImagePreview {
	id: number;
	url: string;
}
interface UploadItem {
	id: number;
	file: File;
}

interface ImagePickerProps {
	value?: ImagePreview[];
	maxFiles?: number;
	onPick?: (files: UploadItem[]) => void;
	onRemove?: (image: { id: number }) => void;
}
export const ImagePicker: FC<ImagePickerProps> = ({
	value = [],
	maxFiles = DEFAULT_MAX_FILES,
	onPick,
	onRemove,
}) => {
	const [initialPreviews, setInitialPreviews] = useState<ImagePreview[]>([]);
	const [newPreviews, setNewPreviews] = useState<ImagePreview[]>([]);

	useEffect(() => {
		setInitialPreviews(value);
	}, [value]);
	const imageCount = initialPreviews.length + newPreviews.length;

	const fileInputRef = useRef<HTMLInputElement>(null);

	const mediaCount = initialPreviews.length + newPreviews.length;
	const canAddMore = mediaCount < maxFiles;

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return;
		if (imageCount >= maxFiles) {
			return;
		}
		const newFiles: UploadItem[] = Array.from(files)
			.map((file) => ({
				id: Date.now(),
				file,
			}))
			.slice(0, maxFiles);

		const previews: ImagePreview[] = newFiles.map(({ id, file }) => ({
			id,
			url: URL.createObjectURL(file),
		}));
		setNewPreviews((prev) => [...prev, ...previews]);
		onPick?.(newFiles);
	};

	const handleRemoveNew = (image: ImagePreview) => {
		setNewPreviews((urls) => urls.filter(({ id }) => id !== image.id));
		URL.revokeObjectURL(image.url);
	};
	const handleRemoveOld = (id: number) => {
		setNewPreviews((urls) => urls.filter(({ id }) => id !== image.id));
	};

	return (
		<div className='grid grid-cols-3 gap-3'>
			{initialPreviews.map((image) => (
				<ImagePreview
					key={image.id}
					url={image.url}
					onRemove={() => handleRemoveImage(image.id)}
				/>
			))}
			{newPreviews.map((image) => (
				<ImagePreview
					url={image.url}
					key={image.id}
					onRemove={() => handleRemoveImage(image.id)}
				/>
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

interface ImagePreviewProps {
	url: string;
	onRemove: () => void;
}
const ImagePreview: FC<ImagePreviewProps> = ({ url, onRemove }) => {
	return (
		<div className='relative aspect-square rounded-lg overflow-hidden border bg-muted'>
			<Image
				src={url}
				alt={''}
				fill
				className='object-cover'
			/>
			<button
				type='button'
				onClick={onRemove}
				className='absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90'
			>
				<X className='h-4 w-4' />
			</button>
		</div>
	);
};
