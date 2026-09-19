/**
 * Implements the Web Storage interface over an in-memory map.
 *
 * @remarks
 * Tests use this instead of the shared page `localStorage` so theme
 * persistence stays isolated. It is a real Storage, not a behavioral fake.
 */
export class MemoryStorage implements Storage {
	#values = new Map<string, string>()

	/**
	 * Returns the number of stored keys.
	 */
	get length(): number {
		return this.#values.size
	}

	/**
	 * Removes every stored key.
	 */
	clear(): void {
		this.#values.clear()
	}

	/**
	 * Returns the value for `key`, or `null` when it is absent.
	 *
	 * @param key - The storage key
	 * @returns The stored string, or `null`
	 */
	getItem(key: string): string | null {
		const value = this.#values.get(key)
		return value === undefined ? null : value
	}

	/**
	 * Returns the key at `index`, or `null` when the index is out of range.
	 *
	 * @param index - The zero-based key index
	 * @returns The key, or `null`
	 */
	key(index: number): string | null {
		return [...this.#values.keys()][index] ?? null
	}

	/**
	 * Removes `key` when it is present.
	 *
	 * @param key - The storage key
	 */
	removeItem(key: string): void {
		this.#values.delete(key)
	}

	/**
	 * Stores `value` under `key`.
	 *
	 * @param key - The storage key
	 * @param value - The string to store
	 */
	setItem(key: string, value: string): void {
		this.#values.set(key, value)
	}
}
