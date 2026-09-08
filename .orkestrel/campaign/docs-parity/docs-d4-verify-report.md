# Verify report — D4 scaffold-gate (scaffold)

## 1. `grep -n "findDrift\|tagline" tests/guides.test.ts`
Exit: 0
Last lines:
```
179:			it('opens the README with the guide tagline', () => {
180:				const pitch = createGuide(requireValue(files['README.md'])).tagline()
184:				const tagline = documented.guide.tagline()
185:				expect(tagline).not.toBeUndefined()
187:				expect(pitch).toBe(tagline)
```
Import and both cases present.

`grep -c "map((method) => method.name)" tests/guides.test.ts`
Exit: 0
Output: `5` (matches expected)

## 2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`
Exit: 0
Output:
```
154: * and {@link locateComment} matches a caller's key against the whole map. A change to the head
826: * so {@link findDrift} reports the absence.
915: * table without it leaves every row's summary absent, which {@link findDrift} reports.
928: * Extracts the guide's tagline — the text of the blockquote following the document's H1,
930: * blockquote ends the window, so a blockquote elsewhere in the document is not the tagline.
```
Lines present; head start intact.

## 3. `npm run format:check`
Exit: 0
Last lines:
```
All matched files use the correct format.
Finished in 8941ms on 222 files using 4 threads.
```

## 4. `npm run lint:check`
Exit: 0
Last lines: (no warnings emitted; command completed clean)

## 5. `npm run check`
Exit: 0
Last lines:
```
> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(no errors reported)

## 6. `npm run test:policy`
Exit: 0
Last lines:
```
 Test Files  1 passed (1)
      Tests  91 passed (91)
   Duration  1.70s
```

## 7. `npm run build`
Exit: 0
Last lines:
```
> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "..."
build-inventory: staged 121 file(s) into host.json
```

## 8. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
Exit: 0
Before: `5c98381e91404aa6fd211a4f0394d481fe69756d68ef6b1a753cada59365280d  host.json`
After:  `5c98381e91404aa6fd211a4f0394d481fe69756d68ef6b1a753cada59365280d  host.json`
Digests match.

## 9. `npm run test:guides`
Exit: 1
Last lines:
```
 FAIL  |guides| tests/guides.test.ts > guides > keeps every compared summary and example equal to its source
AssertionError: expected [ { spec: ..., drift: [...] } ] to deeply equal []
 ❯ tests/guides.test.ts:173:23

 FAIL  |guides| tests/guides.test.ts > guides > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:186:21

 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
   Duration  8.05s
```
Failing case names: `keeps every compared summary and example equal to its source`, `opens the README with the guide tagline`. Every other case (17 of 19) passed. Per this brief's step 9, red on exactly these two named cases is GREEN for this brief's purpose.

## 10. `git status --short`
Exit: 0
Output:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M host.json
 M tests/guides.test.ts
```

## GATES: GREEN
