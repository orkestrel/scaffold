export interface SurfaceRow {
	readonly key: string
	readonly tag: string
	readonly classes: readonly string[]
	readonly parent: string
	readonly pseudo: string
	readonly values: Readonly<Record<string, string>>
	readonly box: readonly number[] | null
	readonly markup: string
}
export interface Departure {
	readonly key: string
	readonly tag: string
	readonly classes: readonly string[]
	readonly pseudo: string
	readonly property: string
	readonly A: string
	readonly F: string
	readonly attribution: string
	readonly reboot: boolean
	readonly markup: string
}
declare global {
	interface Window {
		flipBaseline?: SurfaceRow[]
		flipEvents?: string[]
	}
}
