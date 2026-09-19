import vue from '@vitejs/plugin-vue'
import { it } from 'vitest'
import { appBrowser } from '../../vite.config.js'

it('reports the shape of vue() and the browser plugin array', () => {
	const produced: unknown = vue()
	console.log('vue() isArray:', Array.isArray(produced))
	console.log('vue() length:', Array.isArray(produced) ? produced.length : 'n/a')
	const plugins = appBrowser().plugins ?? []
	console.log('appBrowser plugins length:', plugins.length)
	for (const [index, plugin] of plugins.entries()) {
		console.log(
			index,
			'isArray=',
			Array.isArray(plugin),
			'name=',
			typeof plugin === 'object' && plugin !== null && 'name' in plugin
				? String(plugin.name)
				: String(plugin),
		)
	}
})
