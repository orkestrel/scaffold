// Settles the LEDGER-RETUNE round-2 subjective lane's referrals R1 and R2 by running the resolver on the pairs they
// name, with controls whose answer is known: each pair's reading prints, and the controls are asserted.
import { afterAll, beforeAll, expect, it } from 'vitest'
import { readBootstrapCascade, createValueResolver, type ValueResolver } from '/home/user/veneer-lret/tests/setupServer.ts'

const emitted = ':root { --vn-sample-base: 1px }'
let resolver: ValueResolver | undefined

beforeAll(async () => {
	resolver = await createValueResolver(readBootstrapCascade(), emitted)
}, 60_000)

afterAll(async () => {
	await resolver?.destroy()
})

it('reads the referral pairs and their controls', async () => {
	const pairs: ReadonlyArray<readonly [string, string, string, string]> = [
		['R1 cqw', 'width', '1cqw', '1vw'],
		['R1 ex', 'width', '1ex', '0.5em'],
		['R1 control apart', 'width', '1em', '16px'],
		['R1 control alike', 'width', '16px', '1pc'],
		['R2 custom SERIF', '--vn-sample', 'SERIF', 'serif'],
		['R2 custom Monospace', '--vn-sample', 'Monospace', 'monospace'],
		['R2 control custom apart', '--vn-sample', 'serif', 'monospace'],
		['R2 regular font-family', 'font-family', 'SERIF', 'serif'],
	]
	if (resolver === undefined) throw new Error('No resolver launched')
	const read = await resolver.resolve(
		pairs.map(([, property, recorded, value]) => ({ selector: '.probe', property, recorded: [recorded], emitted: [value] })),
	)
	for (const [index, [label, property, recorded, value]] of pairs.entries())
		console.log(`ROW ${label} | ${property} | ${recorded} vs ${value} | ${JSON.stringify(read[index])}`)
	const reading = (label: string) => read[pairs.findIndex(([name]) => name === label)]
	const apart = reading('R1 control apart')
	expect(apart).toBeDefined()
	expect(apart?.recorded).not.toBe(apart?.emitted)
	const alike = reading('R1 control alike')
	expect(alike).toBeDefined()
	expect(alike?.recorded).toBe(alike?.emitted)
}, 120_000)
