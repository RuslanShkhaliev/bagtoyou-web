import {InputGroup, InputGroupAddon, InputGroupInput} from '@shared/ui';
import {Search} from 'lucide-react';
import {FC} from 'react';


type InputSearchProps = React.ComponentProps<"input">;
export const InputSearch: FC<InputSearchProps> = (props) => {



	return (
		<InputGroup>
			<InputGroupAddon>
				<Search/>
			</InputGroupAddon>
			<InputGroupInput {...props}/>
		</InputGroup>
	)
}
