import {Ref, useImperativeHandle, useState} from 'react';


interface UseModalVisibleOptions {
	visible?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

export interface ModalControllerRef {
	open: () => void;
	close: () => void;
}

type UseModalControllerReturn = [boolean, (val: boolean) => void];

export const useModalController = (ref: Ref<ModalControllerRef>, { visible = false, onOpen, onClose }: UseModalVisibleOptions = {}): UseModalControllerReturn => {
	const [isVisible, setIsVisible] = useState(visible);

	useImperativeHandle(ref, () => ({
			open: () => {
				setIsVisible(true);
				onOpen?.();
			},
			close: () => {
				setIsVisible(false);
				onClose?.();
			},
		})
	)


	return [isVisible, setIsVisible];
}
