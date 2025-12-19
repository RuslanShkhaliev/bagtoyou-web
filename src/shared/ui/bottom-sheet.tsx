import { FC } from 'react';
import { DialogProps, Drawer } from 'vaul';

type BottomSheetProps = DialogProps & {
	handle?: boolean;
};
export const BottomSheet: FC<BottomSheetProps> = ({
	children,
	open = false,
	onOpenChange,
	handle = true,
	...props
}) => {
	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			{...props}
		>
			<Drawer.Overlay className='fixed inset-0 bg-black/40' />
			<Drawer.Portal>
				<Drawer.Content className='z-10 fixed outline-0 bottom-0 left-0 right-0 border-0 h-full rounded-t-[10px] bg-background flex flex-col'>
					{handle && <Drawer.Handle className={'my-2'} />}
					<Drawer.Title />
					<Drawer.Close />
					<div className='p-4 overflow-auto flex-1 z-100'>
						{children}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

BottomSheet.displayName = 'BottomSheet';
