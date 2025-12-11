import {FC, PropsWithChildren} from 'react';
import {Sheet} from 'react-modal-sheet';


type BottomSheetProps = PropsWithChildren<{
	visible?: boolean;
	onVisibleChange?: (val: boolean) => void;
}>

export const BottomSheet:FC<BottomSheetProps> = ({children, visible = false, onVisibleChange}) => {

	const onClose = () => {
		onVisibleChange?.(false);
	}
	const onOpen = () => {
		onVisibleChange?.(true);
	}

	return (
		<Sheet isOpen={visible} onOpenStart={onOpen} onClose={onClose}>
			<Sheet.Container>
				<Sheet.Header />
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	)
};

BottomSheet.displayName = 'BottomSheet';
