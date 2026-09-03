## Guard body
```32:36:src/server/validators.ts
export function isAddressInfo(value: unknown): value is AddressInfo {
	return (
		isRecord(value) && isString(value.address) && isString(value.family) && isNumber(value.port)
	)
}
```

## Test cases
```12:22:tests/src/server/validators.test.ts
	it('rejects a record containing only a numeric port', () => {
		expect(isAddressInfo({ port: 4000 })).toBe(false)
	})

	it('rejects a record missing its numeric port', () => {
		expect(isAddressInfo({ address: '127.0.0.1', family: 'IPv4' })).toBe(false)
	})

	it('rejects a record with a non-string family', () => {
		expect(isAddressInfo({ address: '127.0.0.1', family: 4, port: 4000 })).toBe(false)
```

## Captures
- Red: 2 failed, 3 passed — `/home/user/work/evidence/server-proofs/fix4-red.txt`
- Green: 5 passed — `/home/user/work/evidence/server-proofs/fix4-green.txt`

## Sweeps
- `\brequestEncoding(s|ed|ing)?\b`, case-insensitive, full population: empty.
- `\bresolvePort(s|ed|ing)?\b`, case-insensitive, full population: empty.
- `\b(item|items|info|thing|obj|cfg|msg|doc)\b`, full population: only permitted fixture, prose, and API-member senses; no rejected identifier remains.
- server-obj-8, `^stopping → stopped`: empty.
- server-obj-11, old `readBody` return wording: empty.
- server-obj-12, `readonly code`: only permitted `ServerError.code`; `HTTPError` records `status` as its discriminator.
- server-subj-8, member-site pattern: every relevant `ServerInterface` declaration has an immediately preceding TSDoc block.
- server-subj-10, old boolean parameter forms: empty.

## Git status
```text
 M README.md
 M guides/README.md
 M guides/server.md
 M src/server/Server.ts
 M src/server/Stream.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 A src/server/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/server/Negotiator.test.ts
 M tests/src/server/Stream.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/validators.test.ts
```

## Exit codes
- `npm run format:check`: 0
- `npm run lint:check`: 0
- `npm run check`: 0
- Scoped validators run: 0