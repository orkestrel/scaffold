# ER-MECH round 4 report

## Item 1 — the guide sentence

In `guides/veneer.md` § Hosts, the sentence now reads, as the formatter wraps it:

```
The readers of both tables refuse a malformed cell and name its row, including a Platform cell that
holds no value Node reports as its platform (a Supported hosts row may write `—` for a platform the
guide doesn't name yet) and a Commands cell whose code spans are not separated by commas. The guides
proof refuses a receipt naming a host outside the Supported hosts
```

(The trailing clause continues into the next sentence as before; only the quoted sentence changed.)

## Item 2 — the retained plant

Copied `tests/setupServer.ts` aside, recorded its digest, deleted the Receipts Platform check (the
`if`/`throw` and its comment), and ran:

```
npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "reads receipts only within their Hosts subsection and refuses each malformed cell"
```

logged to `tmp/units/erm-4-plant-receipts-platform.log.txt`. The case failed:

```
AssertionError: expected [Function] to throw an error
- Expected:
null
+ Received:
undefined
 ❯ tests/setupServer.test.ts:1344:38
```

Restored from the copy. Digests, both appended to the same log:

```
before=a6bd5bbf6970a09b103784e0985891748102a08423ff03c2dcc058758df4e11a
after=a6bd5bbf6970a09b103784e0985891748102a08423ff03c2dcc058758df4e11a
```

The restore is byte-identical.

## Gate table

| Gate | Log | Exit |
| --- | --- | --- |
| `npm run format:check` | `tmp/units/erm-4-format.log.txt` | 0 |
| `npm run test:guides` | `tmp/units/erm-4-test-guides.log.txt` | 0 |
| `npm run test:policy` | `tmp/units/erm-4-test-policy.log.txt` | 0 |

`guides/veneer.md` was formatted with `./node_modules/.bin/oxfmt --config .oxfmtrc.json guides/veneer.md`
before the gate run.

## Diff and status

- `git diff 873f715` → `/home/user/veneer-erm/tmp/units/erm-4.diff`
- `git status --short` → `/home/user/veneer-erm/tmp/units/erm-4-status.txt`, showing modified
  `guides/veneer.md`, `tests/distribution.test.ts`, `tests/guides.test.ts`,
  `tests/setupServer.test.ts`, and `tests/setupServer.ts` (rounds 1 through 4, uncommitted over
  `873f715`).
