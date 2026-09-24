// R3 probe: does `map.get(key) ?? new Map()` widen the result to `Map<any, any>`? Each `wrong`
// line assigns the read entry to `number`; a typed entry makes each line an error, and an `any`
// entry lets it compile. The `typed` lines are the control: the explicit type argument.
export class Probe {
	static readonly #presence = new WeakMap<
		HTMLElement,
		Map<'class' | 'style', { readonly present: boolean }>
	>()
	static readonly #pending = new WeakMap<HTMLElement, Map<string, { readonly stamp: number }>>()

	static read(element: HTMLElement): void {
		const records = Probe.#presence.get(element) ?? new Map()
		const record = records.get('class')
		const wrongPresence: number = record
		const pending = Probe.#pending.get(element) ?? new Map()
		const entry = pending.get('token:show')
		const wrongPending: number = entry
		const typed =
			Probe.#presence.get(element) ??
			new Map<'class' | 'style', { readonly present: boolean }>()
		const typedWrong: number = typed.get('class')
		console.log(wrongPresence, wrongPending, typedWrong)
	}
}
