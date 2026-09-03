# Unit guide-prose — report

## The fence and the guard now

`guides/guide.md:523-525`:

```ts
extractSourceLines('export const visible = true // note\n')
// [{ source: 'export const visible = true // note', code: 'export const visible = true        ', jsdoc: undefined }]
// … one record per remaining line
```

`tests/guides.test.ts:344-349`, the `carries the projection fence lines the transcription copies`
test, transcribes both lines:

```ts
expect(guideText).toContain(
	"// [{ source: 'export const visible = true // note', code: 'export const visible = true        ', jsdoc: undefined }]",
)
expect(guideText).toContain('// … one record per remaining line')
```

## The sweep and its rulings

`grep -rn '\.\.\.' /home/user/fleet/guide/guides/guide.md` returns two remaining hits, neither
inside a fence's output comment:

- `guides/guide.md:326` — prose describing `<...>` as a generic angle-bracket span pattern.
  Permitted: not an output elision.
- `guides/guide.md:411` — prose describing `import { ... } from 'specifier'` as an import syntax
  placeholder. Permitted: not an output elision.

## Gates

- `npm --prefix /home/user/fleet/guide run format:check` — exit 0.
- `npm --prefix /home/user/fleet/guide run lint:check` — exit 0.
- `npm --prefix /home/user/fleet/guide run check` — exit 0.
- `npm --prefix /home/user/fleet/guide run build` — exit 0.
- `npm --prefix /home/user/fleet/guide run test` — exit 0; the `test:guides` project passed with
  no failures.

## Audit

`cd /home/user/fleet/guide && npx scaffold audit --offline`:

```
0 of 33 planned paths drifted from the plan. Audit compared bytes at 23, existence at 4, and nothing at 6.
```

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs guide`:

```
/home/user/work/evidence/conform-guide.diff 30 lines
/home/user/work/evidence/conform-guide.status 2 entries
```

`git -C /home/user/fleet/guide status --short` lists only the owned paths:

```
 M guides/guide.md
 M tests/guides.test.ts
```
