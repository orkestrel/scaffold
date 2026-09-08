# Report — `d7n-codec-close-2`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

No hunk. `guides/codec.md` carries no `interface`, `type`, guard, or constants table — every
`## Surface` table (`Codings`, `Measures`, `Charsets`) documents `function` rows only, confirmed
by `grep -n '| interface \|| type \|### Types\|### Guards\|### Constants' guides/codec.md`
printing nothing.

## Item 2 — member references

No hunk. `npm run docs` reports `rows read: 1, disagreements found: 0`; no `{@link Owner#member}`
or `{@link #member}` sites exist in this package's doc blocks or guide cells.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

Hunk against `tests/guides.test.ts`:

```diff
-// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, as is the executed section that closes the file. Every flagship fence
-// in `guides/codec.md` is transcribed at the end of this file and asserted against what
-// its comments claim: name resolution is not a behavioural proof, so a fence documenting a
-// value the code contradicts is exactly what the transcriptions catch. Change a fence,
-// change its transcription.
+// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

The drop-in region (`const root = ` through the manifest loop's closing brace) already carried
the package-specific `derives the exact package export keys from the same face map` case, appended
after the README case and before the manifest loop, matching the brief's shown diff exactly. Line
2 already equalled the pilot's. The `INTERNAL` doc block already carried the pilot's sentence. No
further edit was needed in that region beyond the header fix.

Region diff against the pilot (`/home/user/fleet/abort/tests/guides.test.ts:47-258` vs. this
package's `tests/guides.test.ts:77-303`, both spanning `const root = ` through the manifest loop's
closing brace):

```text
65a66,80
> it('derives the exact package export keys from the same face map', () => {
> 	const parsed: unknown = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
> 	if (typeof parsed !== 'object' || parsed === null) {
> 		throw new Error('The package manifest is not a record')
> 	}
> 	const exported: unknown = Object.getOwnPropertyDescriptor(parsed, 'exports')?.value
> 	if (typeof exported !== 'object' || exported === null) {
> 		throw new Error('The package manifest declares no object exports')
> 	}
> 	const expected = Object.keys(MODULES).map((specifier) =>
> 		specifier === ROOT ? '.' : `.${specifier.slice(ROOT.length)}`,
> 	)
> 	expect(Object.keys(exported).sort()).toEqual(expected.concat('./package.json').sort())
> })
>
```

Only the appended package-specific case, as the brief's acceptance criterion allows.

## Item 4 — fence lead-ins (Ruling 21)

Added one lead-in sentence between each heading and its directly-following fence in
`guides/codec.md`:

```diff
 ### Encode and decode a byte sequence

+This fence builds the round trip through standard Base64, from bytes to text and back, including
+the empty sequence.
+
 ```ts
 import { decodeBase64, encodeBase64 } from '@orkestrel/codec'
```

```diff
 ### Reach the url face

+This fence builds the base64url encoding beside the padded spellings it refuses.
+
 ```ts
 import { decodeBase64URL, encodeBase64URL } from '@orkestrel/codec'
```

```diff
 ### Meet the canonical refusals

+This fence builds the exact texts standard Base64 refuses, beside the canonical spelling each one
+was reaching for.
+
 ```ts
 import { decodeBase64, encodeBase64, isBase64 } from '@orkestrel/codec'
```

```diff
 ### Ask a value whether a decoder would take it

+This fence builds the guard calls that answer whether a value belongs to each Base64 face, without
+decoding it.
+
 ```ts
 import { isBase64, isBase64URL } from '@orkestrel/codec'
```

```diff
 ### Drive the round-trip and canonical-form laws

+This fence builds both laws on one buffer: decoding an encoding back to the original bytes, then
+re-encoding the decoded text to itself.
+
 ```ts
 import { decodeBase64, encodeBase64, isBase64 } from '@orkestrel/codec'
```

```diff
 ### Read the hex face

+This fence builds the lowercase hex round trip beside the uppercase and prefixed spellings it
+refuses.
+
 ```ts
 import { decodeHex, encodeHex, isHex } from '@orkestrel/codec'
```

```diff
 ### Encode and decode through a charset

+This fence builds each charset's own round trip and its refusals, from UTF-8 through Windows-1252
+to UTF-16LE.
+
 ```ts
 import {
```

```diff
 ### Measure without producing the bytes

+This fence builds each measure's byte-length answer beside the same texts its decoder or encoder
+would refuse.
+
 ```ts
 import { measureBase64, measureBase64URL, measureHex, measureUTF8 } from '@orkestrel/codec'
```

## Item 5 — propagation

- `npx oxfmt --write guides/codec.md tests/guides.test.ts` — `Finished in 650ms on 2 files using 4
  threads.` (wall clock 1.119s)
- `npm run docs` — `rows read: 1, disagreements found: 0`, exit 0 (wall clock 0.253s)
- `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`,
  exit 0 (wall clock 0.287s)
- `npm run docs -- --to source` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`,
  exit 0 (wall clock 0.289s)

## Acceptance criteria

1. `git status --short` → `M guides/codec.md`, `M tests/guides.test.ts` — owned files only.
2. `grep -n '| interface *| \`{[^\`]*:' guides/codec.md` and `grep -n '…' guides/codec.md` print
   nothing; no `Shape` cell exists in this guide (item 1, no tables carry the column).
3. Region diff against the pilot prints only the appended package-specific case (shown under item
   3); line 2 equals the pilot's exactly.
4. `npx oxfmt --check guides/codec.md tests/guides.test.ts` → `All matched files use the correct
   format.`, exit 0 (wall clock 0.952s). `npx oxlint --config .oxlintrc.json --deny-warnings
   tests/guides.test.ts` → no output, exit 0 (wall clock 0.621s).
5. `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at
   `written: 0` (shown under item 5).
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 27 passed (27)`, exit 0 (wall clock
   1.201s). `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`,
   exit 0 (wall clock 1.310s).

## Deviations

None. Items 1 and 2 close on "(none)" per the brief's own reading, confirmed by the greps above;
item 3's only outstanding gap was the header, matching Ruling 21's "3c3" line the brief named.
