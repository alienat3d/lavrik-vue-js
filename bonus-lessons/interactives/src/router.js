import { createRouter, createWebHistory } from 'vue-router'

import AppInteractive1 from '@/views/Interactive1';
import AppInteractive2 from '@/views/Interactive2';
import AppInteractive3 from '@/views/Interactive3';

const routes = [
	{
		name: '1',
		path: '/',
		component: AppInteractive1
	},
	{
		name: '2',
		path: '/2',
		component: AppInteractive2
	},
	{
		name: '3',
		path: '/3',
		component: AppInteractive3
	},
];

export default createRouter({
	routes,
	history: createWebHistory()
});
