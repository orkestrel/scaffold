# U5e — report (implementer, Opus 5) — returned 2026-09-15 ~19:15Z

Brief: `U5e-mcp-receipt-residue-brief.md`. Captured from the completion notification. Baseline: the
tree at `8d97dd0` plus U5c and U5d.

All carriers are closed and every gate is green.

## Carriers

**1 — The formatter residue.** Restored each of the four to the single-line form `HEAD` carries, content identical: `tests/distribution.test.ts:306` (`runNode`'s `spawnSync` call), `:738` (the bundle drive's `page.goto`), `:1057` (the module surface check), `:1078` (the CommonJS surface check). The `buildStage` return stays expanded; its hunk is a content change (it adds `packed`), not a rewrap.

**2 — The teardown.** `tests/distribution.test.ts:849` — `afterAll` now runs `closeReceipts()` inside `try` and `rmSync(SCRATCH, …)` inside `finally`, keeping the authored order. The comment states what each buys: the order leaves no child or browser holding files under the tree, and the `finally` covers a stage that rejected on its way up and opened nothing to close.

**3 — The backwards field.** `tests/fixtures/distributionPage.mjs:262,274` and `tests/distribution.test.ts:1552`. The literal instruction collides: the receipt already carried `connected: true` (read after `connect`), so renaming `stopped` to `connected` produces a duplicate key. I kept one term and reported it under the lifecycle call that moved it: `connected: { connect, stop: pair.client.connected }`, pinned as `connected: { connect: true, stop: false }`. Both values and what each proves are unchanged, and no reading now says the opposite of what it proves.

**4 — The header.** `tests/distribution.test.ts:1`. The first paragraph's enumeration is scoped to the surface drives and a following sentence names what the composition receipts read. The composition sentence now says what those receipts name: the packages they pin, and the page fixture they copy in, which imports this package by its published specifier.

**5 — The counts.** Deleted from `tests/distribution.test.ts:122` ("rather than two that can drift"), the teardown comment ("Two hooks would leave the order to the runner", removed with the carrier-2 rewrite), and `:1130` ("two independent recorders" → "independent recorders", the members still named in the same sentence). The sweep found three more, all campaign-added, all fixed: `tests/fixtures/distributionScript.mjs:54` ("the two-turn script" → "the script"), `tests/fixtures/distributionPage.mjs:219` ("The run both paint receipts report" / "the two receipts are comparable" → the members named), and `tests/distribution.test.ts` in the teardown comment ("both installed consumers" → the consumer the drives installed and the consumer the composition installed) and the `findNested` comment ("Where two installed packages need releases…" → "Where installed packages need releases…").

**6 — The dead field.** Kept the field and made it evidence, at `tests/distribution.test.ts:1506`. Text below.

**7 — The duplication.** `tests/fixtures/distributionPage.mjs:223` declares `runPaint(provider)` holding the shared body; `:244` `runPage` and `:355` `runRelay` supply only the provider, and the relay one the credential. `tests/fixtures/distributionScript.mjs:16,19,22` export `TOOL`, `NOTE`, and `ANSWER`; the page fixture imports them at `:15` and the Node fixture at `distributionServer.mjs:20`, whose `SCRIPT` at `:37` is now `buildScript(TOOL, { note: NOTE }, ANSWER)`. `distributionScript.mjs:43` adds the `buildTurn` leaf; `buildScript` composes it, and the bridge receipt composes it at `distributionPage.mjs:296` instead of restating the turn literal. The bridge's absent tool moved to a named constant at `distributionPage.mjs:58`.

**8 — The authorization that cannot redden.** `tests/distribution.test.ts:1700`, with `REFUSED` at `:105`. Guide bullet at `guides/mcp.md:4825`. Details below.

**9 — The flat-install assumption.** `tests/distribution.test.ts:1300` declares `findNested`; `:1502` asserts it against the composition consumer's top-level `node_modules`. `Receipts` carries the consumer's path (`:1164`), returned from `startReceipts`.

**10 — The route table.** `tests/fixtures/distributionServer.mjs:90,97,108,113,118` declare `serveRelay`, `serveControl`, `serveModule`, `serveIndex`, and `servePage` at module scope; `:124` registers each by name beside `reportRelayed`, so the served surface reads as a table.

**11 — The prose.** `tests/distribution.test.ts:1491` restates the closure comment as the bare specifiers the walk reached, and says a relative specifier never enters the map. `guides/mcp.md:4807` replaces the garden-pathing bullet with "the page evaluates each root entry the installed agent's own module names, and every one of them publishes a defined export." `guides/mcp.md:4803` drops the comma before `and`. `tests/distribution.test.ts:1640` names the limit — this package does not carry the cancellation notification's own `reason` into the per-request abort — as the reason the receipt pins the error's class rather than its sentence.

## The residue sweep

Method: `git diff -U0 HEAD -- tests/distribution.test.ts`, then a script over each hunk that collapses every whitespace run to nothing and drops a comma immediately before `}`, `)`, or `]` (the formatter adds one on expansion), and reports a hunk whose removed and added text then compare equal. The untracked fixtures carry no hunks, so the sweep also ran over the guide's diff.

Paths covered: `tests/distribution.test.ts` and `guides/mcp.md`, every hunk of each.

Result before: four rewrap-only hunks, exactly the four the brief names, and no others. `buildStage`'s return read as a content change (it adds `packed`), and the teardown and header hunks read as content changes. Result after the restorations: no rewrap-only hunk in either file.

## The count sweep

Method: over every line the campaign added — `git diff HEAD | grep '^+'` for the two tracked files, and the whole file for each untracked fixture — a case-insensitive match on `one|two|three|four|five|six|seven|eight|nine|ten|both|dozen|several` and on bare digits, then each hit ruled by the sense its row bans rather than by the match. A second sweep for `above` and `below`, and a third for the substitution table's unconditional rows.

Paths covered: `tests/distribution.test.ts`, `guides/mcp.md` (added lines only), `tests/fixtures/distributionPage.mjs`, `tests/fixtures/distributionServer.mjs`, `tests/fixtures/distributionScript.mjs` (whole files).

Result: six hits in the banned sense, all listed under carrier 5, all removed. Every other hit is permitted and was left: a singular `one` naming a single thing (`one authored file`, `one browser`, `one deliberate request`), a relationship rather than a tally (`One provider call is one turn`), the tool's own `title: 'Add two numbers'` and the arity its description states, an ordinal naming an instance over time (`a second relay receipt`, `an earlier one`), and values (`version: '0.0.1'`, `-32600`, `401`, `127.0.0.1`). The `above`/`below` sweep is clean across all five paths, including the guide's added lines. The substitution sweep is clean across all five paths.

## The dead field

I kept `Modules.files` and made it evidence. The assertion at `tests/distribution.test.ts:1506` is:

```ts
const root = join(receipts.consumer, 'node_modules')
expect(
	receipts.modules.files.filter(
		(file) => !file.startsWith(CLOSURE_SCOPE) || !matchesFile(join(root, ...file.split('/'))),
	),
).toStrictEqual([])
const served = Object.values(receipts.modules.imports).map((url) =>
	url.slice(MODULE_PATH.length),
)
expect(served.filter((target) => !receipts.modules.files.includes(target))).toStrictEqual([])
```

It is truthful against what the walk collects: the run is green, so every entry the walk reached is a file inside an installed `@orkestrel` package under the consumer's top-level `node_modules`, and every target the import map names is among them. Neither assertion is vacuous: the preceding assertions establish `receipts.closure.length > 0` and that every closure specifier is a key of `imports`, so `served` is non-empty, and the second assertion passing over a non-empty `served` proves `files` is non-empty too.

## The flat-install reading

The assertion checks that no directory named `node_modules` exists anywhere beneath the composition consumer's top-level `node_modules`. The tree holds none today — the receipt is green — so every bare specifier does resolve against that one top level whatever module named it, and the derivation rests on a measured fact rather than an assumption. No nested install, so nothing to report under Unknowns.

I proved the walk can report one rather than trusting its empty answer: the same walk run against this workspace's own `node_modules` reports 13 nested directories, among them `body-parser/node_modules`, `negotiator/node_modules`, `type-is/node_modules`, `@microsoft/api-extractor/node_modules`, and `@modelcontextprotocol/conformance/node_modules`.

## The refusal receipt

Title: `refuses a relay turn presenting a credential the fixture does not hold [requires a browser]`.

The installed relay answers **401 Unauthorized with an empty body**. I took that from the relay itself rather than from an assumption: the first run of the receipt failed with Chromium's own console line, `Failed to load resource: the server responded with a status of 401 (Unauthorized)`, and the status is pinned from that reading.

It pins three things: the relay refuses `POST /relay` carrying `Bearer distribution-0000-refused` with status `401` and an empty body, and the route's own accounting read afterwards reports `{ relay: 1, served: [{ roles: ['user'], tools: [] }] }` — so the request reached the route and the relay refused it there, rather than the route never seeing it. A relay that stopped calling its `authorize` callback reddens this receipt and nothing else in the file.

Shape decision, recorded here because the brief left the receipt's shape to me: the dial is made from the test process, not from the page. A page-driven dial works and returns the right status, but Chromium reports the refused resource load on the page's console, `readReceipt` raises every console error as a page failure, and the only way to tell that line from the unresolved-module error that guard exists for is to match wording Chromium owns — which is the same defect the cancellation receipt's comment warns against. The page's `runRefusal` was written, measured, and removed; the comment above the receipt states the reason. `readRelayed` already reads the fixture's accounting from this process, so the receipt is consistent with its neighbour.

## Distribution runs

All three `npm run test:distribution -- --mode release`, in the mcp checkout:

| Run | When | Result | Duration |
| --- | --- | --- | --- |
| Baseline, before editing | before carrier 1 | exit 0 — 18 passed, 4 skipped (22) | 22.04s |
| After carrier 7 | with the page-driven refusal receipt | exit 1 — 1 failed, 18 passed, 4 skipped (23); the failure is the refusal receipt tripping the page's console-error guard, and it is what supplied the `401` | 22.46s |
| Final | after every carrier | exit 0 — 19 passed, 4 skipped (23) | 18.93s |

The pre-existing cases are unchanged across all three: the same 18 passing and the same 4 skipping, with the refusal receipt the only addition.

## Acceptance readings

1. `npm run format:check` → exit 0. `npm run lint:check` → exit 0.
2. `npm run check` → exit 0.
3. `git diff HEAD -- tests/distribution.test.ts` carries no rewrap-only hunk. The sweep reports the remaining line-break-shaped hunk as a content change: `buildStage`'s return, which carrier 1 names as forced by the added `packed` field.
4. `npm run test:distribution -- --mode release` → exit 0, 19 passed | 4 skipped (23), 18.93s.
5. `npm run test:guides` → exit 0, 202 passed, 3.14s.
6. `git status --short` names exactly the five owned paths: `M guides/mcp.md`, `M tests/distribution.test.ts`, `?? tests/fixtures/distributionPage.mjs`, `?? tests/fixtures/distributionScript.mjs`, `?? tests/fixtures/distributionServer.mjs`.
7. No `any`, no type assertion, no non-null assertion, no nested function, and no default export in the hunks; the assertion ban is also enforced by the green `lint:check`, whose `consistent-type-assertions` is set to `never`. The count sweep, the `above`/`below` sweep, and the substitution sweep are each clean across all five paths.

Diffstat, tracked files: `guides/mcp.md` +39, `tests/distribution.test.ts` +703/-9; 733 insertions, 9 deletions. Untracked fixtures at their final size: `distributionPage.mjs` 395 lines, `distributionServer.mjs` 138, `distributionScript.mjs` 106.

## Deviation state

No stop. Two decisions I took under the ancillary clause rather than halting, both recorded above:

- **Carrier 3's field name.** Renaming `stopped` to `connected` as written duplicates a key the receipt already carries. I kept the single term and reported the flag under the lifecycle call that moved it, `connected: { connect, stop }`, which leaves both values and what each proves unchanged and removes the backwards literal reading.
- **Carrier 8's receipt shape.** The brief left the refusal receipt's shape to me; it dials from the test process rather than from the page, for the console-guard reason stated above.

One housekeeping note: I wrote this unit's run logs to `tmp/u5e/` in the mcp checkout before rereading that `tmp/**` is off-limits. I copied them to my scratchpad and removed only the `tmp/u5e/` directory I created; `tmp/codex`, `tmp/probe`, `tmp/u4ef`, and `tmp/u5` are untouched.
