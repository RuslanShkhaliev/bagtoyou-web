import { GeoDbModel } from '@lib/geoDb';
import { Ref, useImperativeHandle, useState } from 'react';

interface UseSheetVisibleOptions {
	visible?: boolean;
	onOpen?: (location?: GeoDbModel) => void;
	onClose?: () => void;
}

export interface SheetRef {
	open: (location?: GeoDbModel) => void;
	close: () => void;
}

type UseSheetControllerReturn = [boolean, (val: boolean) => void];

export const useSheetController = (
	ref: Ref<SheetRef>,
	{ visible = false, onOpen, onClose }: UseSheetVisibleOptions = {},
): UseSheetControllerReturn => {
	const [isVisible, setIsVisible] = useState(visible);

	useImperativeHandle(ref, () => ({
		open: (location?) => {
			setIsVisible(true);
			onOpen?.(location);
		},
		close: () => {
			setIsVisible(false);
			onClose?.();
		},
	}));

	return [isVisible, setIsVisible];
};
