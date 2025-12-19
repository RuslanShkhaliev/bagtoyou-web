import Link from 'next/link';

export interface TabItemProps {
	icon: React.ReactNode;
	name: string;
	href: string;
	active?: boolean;
}
export const TabLink = ({ icon, name, active, href }: TabItemProps) => {
	return (
		<Link href={href}>
			<div
				className={`flex flex-col items-center gap-1 ${active ? 'text-blue-500' : 'text-gray-500'}`}
			>
				{icon}
				<span className={'text-xs'}>{name}</span>
			</div>
		</Link>
	);
};
