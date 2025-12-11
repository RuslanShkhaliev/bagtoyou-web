import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from '@shared/ui';
import {EyeIcon, EyeOff} from 'lucide-react';
import {ComponentProps, useState} from 'react';

export const InputPassword = (props: ComponentProps<"input">) => {
	const [isVisible, setIsVisible] = useState(false);
	const toggle = () => setIsVisible(!isVisible);
	return (
		<InputGroup>
			<InputGroupInput
				{...props}
				type={isVisible ? 'text':'password'}
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					variant="ghost"
					aria-label="Info"
					size="icon-xs"
					onClick={toggle}
				>
					{isVisible ? <EyeOff /> : <EyeIcon />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	)
};
