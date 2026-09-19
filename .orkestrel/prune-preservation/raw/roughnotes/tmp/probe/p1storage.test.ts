import { describe, expect, it } from 'vitest'
import { MemoryStorage } from '../../app/browser/MemoryStorage.js'
import { ApplicationController } from '../../app/browser/controllers/ApplicationController.js'

function readKeys(storage: Storage): readonly string[] {
	const keys: string[] = []
	for (let index = 0; index < storage.length; index += 1) {
		const key = storage.key(index)
		if (key !== null) keys.push(key)
	}
	return keys
}

describe('what a submitted request reaches', () => {
	it('names every storage key after an inquiry, a subscription, and an invoice', () => {
		const storage = new MemoryStorage()
		const app = new ApplicationController({ storage })
		expect(
			app.inquiry.submit({
				name: 'Ada Lovelace',
				title: '',
				company: 'Lovelace Agency',
				email: 'ada@agency.com',
				phone: '800-428-4384',
				message: '',
			}),
		).toBe(true)
		expect(app.subscription.submit({ name: 'Ada Lovelace', email: 'ada@agency.com' })).toBe(true)
		expect(app.payment.submit({ customer: '1001', number: '4821', amount: '78.00' })).toBe(true)
		console.log('STORAGE KEYS AFTER THREE SUBMITS:', JSON.stringify(readKeys(storage)))
		console.log('ACCEPTED INQUIRY:', JSON.stringify(app.inquiry.accepted.value))
		expect(readKeys(storage)).toEqual([])
	})
})
