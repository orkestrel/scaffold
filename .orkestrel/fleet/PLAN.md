# Fleet plan — test package, guide debt, fleet cleanup

The campaign of record. Read this first if a session went dark.

## Exit criterion

Every item below ends **implemented**, **repaired**, **retained on evidence**, or **intentionally
excluded on evidence**. The campaign closes when no item is open, not when the last engine runs out
of appetite.

## Order, and why

1. **`@orkestrel/test` publishes first.** It is finished and independent, and the fleet pass needs it
   installed. Publishing it early costs nothing and unblocks everything downstream.
2. **`@orkestrel/guide` is repaired and published second.** The fleet pass wants both packages, and
   doing the pass twice — once per package — is the waste this order exists to avoid.
3. **The fleet pass runs last, once**, adopting both packages and extracting per-package case
   matrices in the same visit to each repository.

## Track T — `@orkestrel/test`

| # | Item | State |
| --- | --- | --- |
| T1 | Surface for `0.0.1` | **Ruled: ship as-is.** No new export is warranted. |
| T2 | Additions and issues ledger | Open for the campaign's life. Section below. |
| T3 | Publish `0.0.1` | Blocked on the user's credential and decision. |

**T1 ruling, on evidence.** The 41-package guide-parity duplication needs nothing new from this
package. Measured:

- The inline corpus walk carried by 36–37 packages is exactly
  `readInventory(root, dirs, { extensions: ['.ts', '.md'] })`. Proved by equivalence, not inspection:
  identical keys and identical values across `abort` (20 files), `emitter` (18), `timeout` (21),
  `contract` (41), `workflow` (76) and `csv` (26). Zero mismatches.
- `readText`/`requireText`, carried by 38 packages, is exactly
  `requireValue(files[key], \`Missing file: ${key}\`)`. Composition of a shipped export.
- The `AGENTS.md` stitch stays in the consumer. Which extra files join the corpus is a package
  decision, and absorbing it into a primitive would remove customization rather than add it.

Everything else the guide tests repeat — `SELF_SPECIFIERS`, `SPECIFIER_MODULES`, the
`Interface`-suffix pairing — is guide-parity policy and belongs to Track G, not here.

Adding capability now with no consumer would violate the creation gate in `AGENTS.md`. The real
consumers arrive in Track F, and what they need is recorded in T2 as it appears.

### T2 — running ledger

Append here the moment something is found; do not carry it in context.

**Ideas to add** — each needs a real consumer before it ships.

- _(none yet)_

**Issues to fix**

- _(none yet)_

**Closed without action, with the reason**

- A shared corpus-walk helper — `readInventory` already is it, proved by equivalence.
- A `readText` helper — `requireValue` composes it in one line.

## Track V — verify every claim before designing against it

**No comment in a consumer's `tests/guides.test.ts` is evidence.** Each one states a reason for a
workaround, and each reason is a claim to probe. `.claude/rules/quality.md` already says a code
comment is not evidence; this track makes that a gate rather than a habit.

Nothing in Track G designs against a claim this track has not tested.

| # | Claim, as the comment states it | Verdict |
| --- | --- | --- |
| V1 | `worker`: "Source exports have no file/barrel attribution, so exclude the exact internal class names" | **FALSE.** Measured: `source.surface()` already excludes exactly the internal classes and nothing else — `worker` `exports()` 13 / `surface()` 10 with `Dispatch`, `NodeWorker`, `Thread` present in the first and absent from the second; `middleware` 50 / 49 with `MultipartParser` the only difference. Barrel attribution exists and is named `surface()`. The denylist works around a shipped capability. |
| V2 | The remembered reason for `worker`'s locals: a file run in a new thread cannot import the rest of the package, especially core | **Does not apply to these three classes.** `src/server/NodeWorker.ts:5` is `import { createWorker } from '@src/core'` — the class imports core directly. `Thread` holds `readonly #script: string \| URL`, so the file that runs in the new thread is the **consumer's** script, not these classes, which run on the main thread. The constraint is real for a consumer's worker entry and irrelevant here. |
| V3 | `toolbox` and 16 others: one `Source` cannot answer a fence importing another face, so a specifier→module map plus an `exportsFor` cache is needed | **TRUE.** Measured on `toolbox`: core surface 141 names, server surface 10, **overlap 0**. No server name — `TerminalRoutes`, `TerminalConnection`, `Method` — appears in the core surface, so a core `Source` cannot answer a fence importing the server face. G5 is real work. |
| V4 | `database`: lexical `Source` cannot express its public surface, so a TypeScript compiler surface is required | **FALSE.** Re-probed at the scope `database`'s own manifest declares — `["src/core","src/browser","src/server"]`, not the single module the first probe used. `source.surface()` is an **exact bijection** with the documented surface: documented 129, `surface()` 129, **nothing documented missing from `surface()` and nothing in `surface()` undocumented**. `exports()` returns 138, the 9 extra being exactly the internal classes. Lexical `Source` expresses this package's public surface precisely; the compiler surface is not needed for parity. The first probe's "missing drivers" reading was its own scope artifact, now corrected. |
| V5 | `mcp`: `fenceImports` misses mixed `import Default, { named }`, and a slash after a bare `}` swallows the rest of a fence | **Mixed import TRUE**, measured: `fenceImports("import D, { a } from '@x/y'")` returns `[]` while the brace and `import type` forms both resolve. **Slash-after-brace did not reproduce** on the Orchestrator's vector, which returned the import normally — so that half is open, and `mcp`'s exact vector is owed before ruling either way. A failed reproduction is evidence about the vector first. |
| V6 | `html`: the walker must skip `app/browser/main.ts` and `app/server/main.ts` | Untested. Probe whether gates stay green without the skip. |

**V1 changes Track G.** G4 asked for a capability that already exists, so it is struck as a guide
change and becomes a per-package correction: `worker`, `middleware` and any package in the same shape
either adopt `surface()` as their documented-surface population or record why `surface()` does not
fit. That correction belongs to Track F, in the same single visit.

There is a second, separate question V1 exposes and does not answer: 13 implementation classes across
`database` (9), `worker` (3) and `middleware` (1) carry `export` for the policy sweep while being
deliberately absent from their barrel. `.claude/rules/architecture.md` says an intentional reusable
export belongs in the barrel and a non-public declaration should be a true private detail. Three
packages sitting between those two rules is a design question for `scaffold`'s rule set, not a defect
in any one package. Recorded, not fixed here.

## G7 — the finding the probes actually produced

Three packages built three different workarounds and two were unnecessary:

| Package | Workaround | Needed? |
| --- | --- | --- |
| `worker` | `INTERNAL_EXPORTS` denylist over `exports()` | No — `surface()` excludes exactly those |
| `database` | a TypeScript compiler surface via `deriveEntrySurfaces` | No — `surface()` is an exact bijection with its documented surface |
| `middleware` | silence; `MultipartParser` simply sits in `exports()` | No — same |

The common cause is not a missing capability. It is that **neither `exports()` nor `surface()` says
in its name or its row which question it answers**, so each package guessed and built machinery
around the guess.

- `exports()` — every direct declaration under the selected modules. Includes a class that carries
  `export` only because the policy sweep requires it.
- `surface()` — every declaration reachable through the barrels. This is what a consumer can import,
  and therefore what a documented surface should be checked against.

**The repair is documentation, not API.** `guides/guide.md` must state which projector a parity test
should use for its documented-surface population, and why: a guide documents what a consumer can
import, so `surface()` is the default and `exports()` answers a different question — what the package
declares. Both rows exist; neither says this today.

That repair is cheaper than either API addition it replaces, and it prevents the fourth package from
inventing a fourth workaround. It ships with the G5 change in the same `guide` release.

## Track W — a sandbox capability for `@orkestrel/test`

`createScratch` is one half of a sandbox that already existed in this fleet's history: filesystem
work constrained to a temporary directory, set up, tracked, and cleaned up. The other half captured
and controlled the process's console and its `stdin`/`stdout`/`stderr`, also set up, tracked, and
cleaned up, and switchable on and off.

**Research and rule, do not implement on sight.** The question is what the smallest honest mechanism
is for `@orkestrel/test` to offer both halves, given a hard constraint:

- **Zero runtime dependencies stay zero.** `@orkestrel/workspace`, `@orkestrel/console` and
  `@orkestrel/terminal` must not become dependencies of a package installed by all 41.
- `AGENTS.md` forbids reimplementing or rename-wrapping a declared package primitive. So the ruling
  must separate what those packages own from what a test-scoped sandbox genuinely owns, and prove the
  difference rather than assert it.
- The capture half touches process-global state, so its contract must say what happens on nested
  use, on a throw mid-capture, and on a test that never restores.

Read `@orkestrel/workspace`, `@orkestrel/console` and `@orkestrel/terminal` first, then run the
two-lane design pass. An outcome of "this belongs in those packages and `@orkestrel/test` composes
nothing" is a legitimate result and closes the item.

## Track G — `@orkestrel/guide`

Three defects, then two bounded gaps, then one deep limit. `guide` is at `0.0.10` and depends on
`@orkestrel/contract@^0.0.11` and `@orkestrel/markdown@^0.0.8`.

| # | Item | Size | Evidence |
| --- | --- | --- | --- |
| G1 | `extractPatterns` silently drops every fence that is not ```` ```ts ````. Fail loudly on an unrecognized fence language instead. | small | `guide/src/core/helpers.ts:1455`. Latent, not live: across all 41 guides there are 3581 ```` ```ts ````, 102 ```` ```text ````, 82 ```` ```sh ````, and zero ```` ```typescript ````. The first person to write ```` ```typescript ```` loses their fence checks while parity stays green. |
| G2 | `firstCode`'s guide text omits `image`. | one line | `guide/guides/guide.md:88` says it descends `emphasis` and `link`; `helpers.ts:850` also descends `isImageNode`. A parity defect in the parity package. |
| G3 | `fenceImports`' guide table does not name the import forms it excludes. | one line | `guide.md:93`. `mcp` works around the mixed `import Default, { named }` case at `mcp/tests/guides.test.ts:148-162`. |
| G4 | `exports()` carries no barrel attribution, so a package cannot express "declared but not public". | bounded design | `worker` maintains `INTERNAL_EXPORTS` for exactly this — `worker/tests/guides.test.ts:27-31, 99`. Coding law requires `export` on classes deliberately absent from the barrel. |
| G5 | No specifier-to-face resolution. One `Source` cannot answer a fence importing another face of the same package. | bounded design | 38 packages carry a `SELF_SPECIFIERS` allowlist; 17 carry a `SPECIFIER_MODULES` map plus a hand-rolled `exportsFor` cache. `fenceImports` parses imports and has no concept of "self". |
| G6 | **CLOSED — retained on evidence.** `Source` stays lexical. Both cited reasons for exceeding it are falsified: V1 shows `worker`'s denylist works around `surface()`, and V4 shows `surface()` is an exact bijection with `database`'s documented surface at its real manifest scope. No reachable parity defect motivates a parser. Reopen only on a measured case where `surface()` cannot express a package's public surface — a named re-export or `export type {}` form that a package actually ships and that parity therefore misses. Until such a case exists, this is a documented limit rather than a defect, and `.claude/rules/quality.md` says to document the obligation rather than build machinery against a requirement nobody wrote down. | ruled | `Source` sees only column-zero `export …` and `export * from './x.js'` barrels. Named re-exports, `export type {…}` and collisions fall outside the grammar. Root cause of both G4's workaround and `database`'s compiler surface at `database/tests/setupServer.ts:274`. Documented as deliberate at `guide/src/core/types.ts:128-154`. May legitimately end as "retained on evidence". |

G6 gets its own adversarial design pass and may close with no code change. Do not patch it.

## Track S — `@orkestrel/scaffold` and fleet convention

| # | Item | Evidence |
| --- | --- | --- |
| S1 | No package has `prepack` or `prepare`, so `npm pack` ships whatever stale `dist/` is on disk. Publication is safe because `prepublishOnly` runs `clean && build`, but anyone inspecting an artifact reads stale code. Cost one audit round in the `test` campaign. Proposed shape: `prepack` builds, `prepublishOnly` keeps the gates and drops its build, so neither doubles. | 0 of 41 have either script. |
| S2 | All 41 READMEs link into `guides/`, and `files` ships `dist/src` and `README.md` only. **Every published README has a dead link.** | 41 of 41. |
| S3 | All 41 CI workflows are `ubuntu-latest` only, so any permission-bit or path-separator assertion is proven on POSIX and nowhere else. | 41 of 41. Likely intentional; **decide and record**, do not change silently. |

## Track P — individual packages

| # | Item | Evidence |
| --- | --- | --- |
| P1 | `html` test title says `documents an example for every API Surface function` while its guide heading is `## Surface`. | `html/tests/guides.test.ts:68` against `html/guides/html.md:9`. |
| P2 | `pool` carries a README-against-`package.json` engines/exports check no other package has. Decide whether it is fleet convention. | `pool/tests/guides.test.ts:49-79`. |

## Track F — the fleet pass, last and once

Gated on `@orkestrel/test` and `@orkestrel/guide` both published.

| # | Item | Evidence |
| --- | --- | --- |
| F1 | Adopt `@orkestrel/test` in all 41: replace the corpus walk, `readText`, and every extracted helper it now ships. | 384 setup-file clusters, topping out at 32 packages for `createRecorder`. |
| F2 | Extract per-package case matrices into each package's own setup file. **1,574 repeated five-line blocks across 36 packages**, counting only blocks repeated three or more times inside one package: `mcp` 208, `database` 200, `scaffold` 121, `workflow` 121, `contract` 111, `middleware` 99, `agent` 93. Worst single blocks are a 42× query-builder condition table in `database`, a 24× intrinsic-probe matrix in `contract`, an 18× `duplexPair` fixture in `websocket`. `tests.md` already rules: data tables and case matrices belong in a setup file at any size. | token-window clone detector over 483 files, 81,102 windows |
| F3 | Republish cascade in catalog layer order for whatever the pass moves. | Read the order from the catalog table `scaffold catalog` regenerates. Never from a second written copy. |

Visit each repository **once**, doing F1 and F2 together. Serialize writers per repository.

## G1 ruling — `patterns()` becomes `fences()`

Both lanes ran one brief, blind. The objective lane chose **B**: keep `patterns()` and add a
reporting window, `extractFenceLanguages` plus `GuideInterface.languages()`. The subjective lane
chose **D**: make the projection total — `fences(): readonly GuideFence[]` carrying
`{ language, code }` — delete `extractPatterns`, and ship one comparison leaf `findUnlisted`.

**Ruled: D.** Three grounds, in order.

1. **The filter is the defect, not the literal.** Five of six `GuideInterface` members are total over
   a stated scope. `patterns()` is the only one that discards document content by a criterion its own
   name does not state, and its TSDoc at `guide/src/core/types.ts:99` says "whole document" while the
   population is filtered. B leaves that in place and adds a second member to narrate what the first
   threw away.
2. **D widens the seam; B only reports on it.** Under B a package documenting `sql` or `sh` examples
   still cannot make those fences feed the example or import checks, because `guide` already decided
   `ts`. Under D the package writes that predicate in its own file. That is what the per-package copy
   exists for.
3. **The objective lane costed D against a fleet visit that is already scheduled.** It rejected D as
   breaking 40 consumers. Measured: 40 of 41 call `.patterns()`, and `@orkestrel/guide` is a
   **devDependency in 40 packages and a runtime dependency in 0**. A development bump reaches nobody,
   so consumers re-pin, prove gates and commit with no version bump and no cascade — and Track F is
   already visiting every repository once. The marginal cost of D is near zero.

Verified before ruling rather than taken on trust: `CodeBlockNode.lang` is `readonly lang?: string`
at `markdown/src/core/types.ts:183-189`, and `markdown` is at `0.0.8` matching guide's `^0.0.8` pin.
So `string | undefined` needs no sentinel, which is what lets an untagged fence be reported honestly.

**The risk D carries, and its settling check.** D's language assertion is opt-in, so a batched fleet
edit could emit 41 identical `.filter(f => f.language === 'ts')` lines, add no assertion, and report
green from exactly where we started. The subjective lane raised this against its own decision. It is
a hard acceptance criterion on Track F, not a note:

```text
grep -l findUnlisted /home/user/packages/*/tests/guides.test.ts | wc -l   # must equal 41
```

Each Track F slice measures its own package's fence languages first and lists second. It never
inherits `['ts', 'text', 'sh']` from this ruling — that set was measured across shipped top-level
`guides/` only, in column-zero lowercase form, and an uppercase tag or a fixture fence is outside it.

### G1 units

| Unit | Owns | Engine |
| --- | --- | --- |
| U1 | `src/core/types.ts`, `src/core/helpers.ts`, `src/core/Guide.ts` | Opus `implementer` |
| U2 | `tests/src/core/*.test.ts`, `tests/guides.test.ts` | Sol `implementer` |
| U3 | `guides/guide.md` | Opus `implementer` |
| U4 | each consumer's `tests/guides.test.ts` and pin | folded into Track F, gated on `guide` publishing |

U2 needs a negative control: a fixture guide carrying a `typescript` fence that `findUnlisted` must
report. Without it the check passes everywhere on day one and has never been red.

## Rulings already taken, so they are not relitigated

- **`guides.test.ts` stays per-package.** The copy is the customization seam: it lets a package make
  its parity proof specific to itself and carry its own exceptions without republishing
  `@orkestrel/guide`. Every divergence checked across 41 packages was deliberate and commented. Four
  projectors exist — 36 on `source.exports()`, `worker` on a filtered `exports()`, `guide`/`mcp`/
  `scaffold` on `source.surface()` with the claim renamed to "barrel", and `database` on a TypeScript
  compiler surface. That is the seam working, not drift.
- **`@orkestrel/test` ships no guide-parity export.** Its contract forbids naming a foreign
  `@orkestrel/*` type, and a structural restatement would redeclare another package's published
  contract.
- **No Windows CI runner.** The package documents no drive-relative or UNC claim; a word-bounded
  search of all 41 guides and READMEs returns zero occurrences of UNC, drive, win32 or Windows.

## Corrections this campaign already had to make

Recorded so the next reader does not trust the superseded numbers.

- The `37 vs 3` split between `source.exports()` and `source.surface()` was an artifact of a
  token-window clone detector reporting which line fell inside a matched window. The real shape is
  four projectors, above.
- "4 packages build the corpus in a setup file" was wrong. It is **3** — `html`, `guide`, `mcp`.
  `database` walks inline; its setup file holds the compiler surface, not the corpus.
