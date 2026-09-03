## Vectors

| Input | Recorded output | Claim | Fence | Assertion |
| --- | --- | --- | --- | --- |
| `createHTML('<img src="/x.png" alt="x">')` sanitized with defaults | `<img alt="x">` | A sanitized image keeps `alt` and loses the resource `src`. | `guides/html.md:443` | `tests/guides.test.ts:329` |
| `createHTML('<a href="java&#115;cript:alert(1)">bad</a>')` sanitized with defaults | `<a>bad</a>` | The sanitizer decodes an entity-obfuscated scheme before it refuses the `href`. | `guides/html.md:446` | `tests/guides.test.ts:332` |
| `createHTML('<table><tr><td align=" Center ">c</td></tr></table><p align="center">p</p>')` sanitized with `{ attributes: ['align'] }` | `<table><tr><td align="center">c</td></tr></table><p>p</p>` | A table cell keeps a trimmed lowercase allowed alignment, while a paragraph loses `align`. `SAFE_ELEMENTS` includes `table`, `tr`, and `td`, so the supplied vector was used unchanged. | `guides/html.md:449` | `tests/guides.test.ts:335` |

## Failing-first controls

- Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`
- Red: 1 failed and 31 passed; capture: `/home/user/work/evidence/html-sanitizer-proofs/red.txt`
- Green: 32 passed; capture: `/home/user/work/evidence/html-sanitizer-proofs/green.txt`

## Gates

| Command | Exit | Capture |
| --- | --- | --- |
| `npm run format:check` | 0 | `/home/user/work/evidence/html-sanitizer-proofs/format-check.txt` |
| `npm run lint:check` | 0 | `/home/user/work/evidence/html-sanitizer-proofs/lint-check.txt` |
| `npm run check` | 0 | `/home/user/work/evidence/html-sanitizer-proofs/check.txt` |
| `npm run test:guides` | 0 | `/home/user/work/evidence/html-sanitizer-proofs/test-guides.txt` |

## Sweeps

`git status --short`:

```text
 M guides/html.md
 M tests/guides.test.ts
```

`git diff --stat`:

```text
 guides/html.md       | 13 +++++++++++++
 tests/guides.test.ts | 17 +++++++++++++++++
 2 files changed, 30 insertions(+)
```

## Deviations

None.
