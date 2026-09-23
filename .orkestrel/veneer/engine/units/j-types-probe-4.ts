import type { SanitizerConfig } from 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'

export const perElement: SanitizerConfig = {
	elements: [{ name: 'a', attributes: ['href'] }, 'b'],
	attributes: ['class'],
	dataAttributes: false,
}

export const flat: SanitizerConfig = { elements: ['span'] }

export const numeric: SanitizerConfig = { elements: [42] }

export const nameless: SanitizerConfig = { elements: [{ attributes: ['href'] }] }
