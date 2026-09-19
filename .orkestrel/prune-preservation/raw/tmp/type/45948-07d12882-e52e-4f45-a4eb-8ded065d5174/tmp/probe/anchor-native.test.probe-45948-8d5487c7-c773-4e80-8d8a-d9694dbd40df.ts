import { resolve } from 'node:path'
import { createScratch } from '@orkestrel/test/server'
import { readAnchor } from '@src/server'
import { expect, it } from 'vitest'

it('binds the registered canonical workspace', () => {
	expect(process.cwd()).toBe(resolve('C:/Users/mikes/WebstormProjects/scaffold'))
})

it('captures a real directory and refuses an absent path', () => {
	const scratch = createScratch()
	try {
		expect(readAnchor(scratch.path)).toBeDefined()
		expect(readAnchor(resolve(scratch.path, 'absent'))).toBeUndefined()
	} finally {
		scratch.destroy()
	}
})
// @orkestrel/probe generated specification 45948-8d5487c7-c773-4e80-8d8a-d9694dbd40df
