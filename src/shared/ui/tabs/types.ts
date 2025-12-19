import type React from 'react';

export interface Tab {
	key: string;
	title: string;
	badge?: number;
	icon?: React.ReactNode;
}

export interface TabSceneProps {
	tab: Tab;
	index: number;
}

export type TabScene = React.ComponentType<TabSceneProps>;

export type TabScenes = Record<string, TabScene>;
