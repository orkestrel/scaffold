# Unit R2 — reconcile ROADMAP.md against the campaign's outcomes

## Role and engine

`implementer` on Claude Opus 5, native subagent. Perform the assignment directly and spawn
nothing.

## Objective

Rewrite `/home/user/scaffold/ROADMAP.md` so it states the plan of record after this campaign
(2026-08-25). Do not commit.

## Law

`AGENTS.md` § Writing and § Instruction files, `.claude/rules/writing.md`,
`.claude/rules/documentation.md` (`ROADMAP.md` is the sequenced plan of record). Never state a
count of a growable set. Every row is package-keyed bold, one to two sentences, evidence-dated,
matching the file's existing voice.

## Evidence

- The current file: `/home/user/scaffold/ROADMAP.md` (97 lines).
- The findings matrix: `/home/user/scaffold/.orkestrel/campaign/fleet-findings-matrix.md`, with
  the per-visit reports beside it under `.orkestrel/campaign/fleet/`.
- The audit records: `.orkestrel/campaign/test/` (W56), `.orkestrel/campaign/probe/` (ARM).
- Registry state, confirmed today: scaffold 0.0.52, mcp 0.0.23, brief 0.0.6, probe 0.0.5.

## Row rulings — § 1 (apply exactly; do not re-derive)

**Close (remove) these rows, absorbing each into the header's closed-campaign sentence:**

1. `scaffold: publish the release…` — 0.0.52 published and registry-confirmed 2026-08-25; the
   adoption wave closed the same day (every fleet target re-pinned, repaired, gated green,
   pushed).
2. `scaffold: --no-cache ruling` — ruled: the planned value owns it; every target adopted the
   planned `test:guides` during the wave.
3. `fleet: uncovered tests/setup.ts modules` — every reported package landed its proofs and
   `setup` project during the wave; no `setup:` advisory remains anywhere in the fleet.
4. `test: transcribe the remaining guide fences` — the browser carriers landed with exact
   markers, the totality guard executes and was hardened after an objective audit (CommonMark
   fences, deeper-heading preservation, line-anchored markers), and `below` became `later`.
5. `mcp: StdioServerTransport.send` — ruled and implemented: `send` awaits a promise-based
   `writeLine`, surfaces stream errors as rejections, and rejects after close; published in
   0.0.23.
6. `middleware: setupServer proofs` — landed with the `setup` project in the wave.
7. `html: tests/setup.ts proof` — landed in the wave.
8. `html: NAMED_ENTITIES membership strength` — ruled: the vendored WHATWG fixture is the
   reference and the table is asserted equal to it; size-plus-spot assertions are gone.
9. `process: weak negative assertion` — strengthened: the merged case asserts a real child's
   terminal pair.
10. `process: spawning proof placement` — placed per the workspace rules with the guide passage.
11. `brief: Interpretation member names` — centralized as the frozen `INTERPRETATION_MEMBERS`
    constant with an executed guide fence; published in 0.0.6.

**Keep byte-identical:** the three `supervisor` rows and the `probe` mintty row.

**Add these rows (draft each in the file's voice; the substance is fixed, the wording is
yours):**

- **scaffold**: the blocked-`configs` `repair` message claims `test:setup is already declared`
  while the manifest declares no such script (the wave recorded it in eleven visits); correct
  the clause at the next release. In the same release, rule on `npm pkg set` appending
  `test:setup` after `prepack` rather than beside the `test:*` keys, and on
  `repair --groups manifest` rewriting the `@orkestrel/scaffold` range as a side effect of
  writing a script (observed in the test repository).
- **html**: `src/core/constants.ts` TSDoc carries counts of the entity set and a stale snapshot
  date; rewrite per the writing rules at the next release.
- **agent**: `tests/setup.ts` registers the conversation-store battery with `describe`/`it`/
  `expect`, which the shared-infrastructure rule forbids; move the registration into the two
  store twin suites.
- **database**: same class — `conformDriver` in `tests/setup.ts` carries `describe`/`it`/
  `expect`; move the battery registration into the consuming suites. Also:
  `createIntegrationDatabase` in `tests/setupBrowser.ts` is imported by no suite, so its opened
  half is proven nowhere; give it a consumer or remove it.
- **test**: `src/browser/helpers.ts` imports `vitest/browser` at module scope, so the published
  browser barrel cannot load outside Browser Mode; the repository's own `tests/setupBrowser.ts`
  works around it with a DOM-guarded dynamic import. Rule whether the published barrel owns a
  lazy import, and pin the ruling.
- **mcp**: `buildElement` in `tests/setupBrowser.ts` has no consumer; give it a `src:browser`
  proof or remove it. The 2026-08-25 audit also referred two rulings: a post-close pin for the
  WebSocket transport and the race-abandoned `writeLine` callback.
- **probe**: a boot whose control inspection expires rejects silently — no `arm`, no `error`
  event, invisible until the next `prove` retries — which cost the 0.0.5 release a
  five-run diagnosis; rule on surfacing boot rejection. Also run `npm pkg fix` at the next
  manifest touch (npm normalizes the `bin` entry's `./` prefix at publish).
- **interpret / reason**: `TRICKY_KEYS` TSDoc misdescribes its stored bytes (claims a combining
  sequence and an NFC-labile form; the stored form is precomposed and NFC-stable), and
  `INTEGER_KEY_SUBJECT`'s comment states a wrong `Object.keys` order; correct both at each
  package's next release.
- **msg**: `patchBytes` documents a copy-only contract but mutates its `Buffer` source through a
  `.slice()` view (latent; the wave's proof pinned the copying route); align the implementation
  with the contract at the next release.
- **qualifier**: `buildHostileRecord`'s `__proto__` literal is inert and its doc comment
  overstates the hostility; correct at the next release.
- **table**: `readTableError` reports a non-thrown case as `undefined`, indistinguishable from
  success; rule whether the helper names the non-throw at the next release.
- **ollama**: `tests/setupService.test.ts` declares its protocol-faithful daemon fixture
  locally because the shared setup modules were out of its unit's scope; move it to the shared
  module when a second consumer appears.
- **fleet**: `isBrowserVuePath` repeats across packages with no `app/` tree in several; the next
  cross-package alignment campaign owns the dedup-or-delete ruling.

## Header

Rewrite the opening paragraph: the plan of record after the ROADMAP-rows campaign of 2026-08-25
(which closed the rows enumerated in the close list through implementation, cross-engine audit,
the fleet setup-proof wave over every published package, and the mcp 0.0.23, brief 0.0.6, and
probe 0.0.5 releases). Keep the sentence that campaign detail is recoverable from git history
and that no campaign folder is the plan of record.

## Section 2

Keep § 2 unchanged.

## Scope

**Owned.** `/home/user/scaffold/ROADMAP.md`.
**Off-limits.** Everything else.
**Tools.** Read, Grep, Glob, Edit, Write, Bash (validation only).

## Validation

`npx oxfmt --config .oxfmtrc.json --check ROADMAP.md` clean (run `npx oxfmt --config
.oxfmtrc.json ROADMAP.md` first if needed), and a case-insensitive sweep of the changed prose
against the substitutions table in `.claude/rules/writing.md`, reported with the pattern and the
result.

## Output

Write `/home/user/scaffold/tmp/units/r2-report.md`: the ruling applied per row (closed, kept,
added), the substitution-sweep result, and the validation closing lines. Return the same content
as your final message.

## Deviation contract

Stop and report if a close ruling contradicts what a retained report actually records, or if a
supervisor or mintty row cannot be kept byte-identical under the rewrite. Wording of added rows
and the header is yours within the writing rules.

## Acceptance criteria

1. Every § 1 row from the close list is gone; the supervisor and mintty rows are byte-identical;
   every added row from the list is present, package-keyed, in the file's voice.
2. The format check closes clean and the substitution sweep reports its pattern and result.
