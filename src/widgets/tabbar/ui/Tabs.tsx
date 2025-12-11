import {PropsWithChildren} from 'react';

export const Tabs = ({children}: PropsWithChildren) => {
	return (
		<div className="fixed bottom-0 left-0 w-full h-[50px] backdrop-blur-2xl border-t-1 flex items-center">
			<div className="flex items-center w-full">
				{children}
			</div>
		</div>
	)
};
