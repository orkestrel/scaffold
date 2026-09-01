// Tier 0 control: no library import, no Infer. Plain interfaces and a value.
interface MediumRecord {
	readonly name: string
	readonly age: number
	readonly active: boolean
	readonly tags: readonly string[]
	readonly role: 'admin' | 'editor' | 'viewer'
}
export const mediumValue: MediumRecord = {
	name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin',
}
