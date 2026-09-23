# `checker` verdict — B-FORMS-CLOSE-SPECIMENS (`bfs`), claims 1, 3, 4, and 9 (Sonnet, agent a55d08c891d81c1e8)

Retained verbatim from the lane's returned message.

---

checker (Sonnet), mechanical conformance, claims 1, 3, 4, and 9 of `/home/user/scaffold/.orkestrel/veneer/units/bfs-audit-claims.md`. Subject: `/home/user/veneer-bfs`, evidence: `bfs.diff`, `bfs-status.txt`, `b-forms-close-specimens-brief.md`, `bfs-setup.log.txt`.

**Claim 1 — CONFIRMED.** `bfs-status.txt:1-4` lists exactly `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`, `tests/setup.ts` as modified, nothing else. `bfs.diff` has no hunks against `src/**`, `guides/**`, `tests/setupStyles.ts`, `tests/src/**`, or `tests/fixtures/**`. The named mutation this claim guards against — a status line naming a fifth file — is absent from the actual `git status` output the Orchestrator supplied, and I read that output directly rather than the writer's report.

**Claim 3 — CONFIRMED.**
- `tests/setup.ts` diff (`bfs.diff:298-306`): `CaptureSubject` gains `'Input group invalid tooltip'` and `'Input group valid tooltip'`, in the union's declared alphabetical run (addons, button, invalid tooltip, large, plain, small, valid tooltip, validation — `'valid tooltip'` sorts before `'validation'` because a space (0x20) precedes `a` (0x61) at the divergent character).
- `bfs.diff:403-418`: `CASCADE_KEYS` gains one row per specimen — `scenario: 'input-group-valid-tooltip'`, `selector: '.is-valid ~ .valid-tooltip'`, `property: 'display'`; and the invalid twin with `.is-invalid ~ .invalid-tooltip`. These are the "capture registry rows" the claim names; no separate registry structure exists in `tests/setup.ts` for a resting-frame capture (confirmed by grep: the subject strings appear only inside `CASCADE_KEYS`, not in any other list).
- The uniqueness case: `bfs-setup.log.txt:88-95` (the Orchestrator's own run) reads `Test Files 4 passed (4)`, `Tests 243 passed (243)`, `test:setup exit=0` — this is the reading the brief designates as authoritative for this sub-claim, and it is a run the Orchestrator itself executed, not the writer's self-report.

**Claim 4 — CONFIRMED.**
- The `CASCADE_KEYS` doc block (`bfs.diff:316-400`) describes the population by its rule ("every resting cascade key a journey photographs, with its specimen, the selector … and the property …") and names no member — no `'Input group valid tooltip'` or scenario string appears in the prose.
- The rest case title (`bfs.diff:94`) reads `'reads every resting cascade key the same on its lifted frame as in the showcase, in light and dark'` — no member name.
- `writing.md` conformance: I swept every changed comment and doc-block line in `bfs.diff` against the full substitution table (`should`, `simply`/`easy`/`just`, `currently`/`now`, `new`/`latest`, `utilize`/`leverage`, `via`, `in order to`, `e.g.`/`i.e.`, `etc.`, `performant`/`robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) case-insensitively: no hits. `above`/`below` appear twice (`bfs.diff:36,41,163,184`) but each is a physical-position sense ("hangs below the group", "paints over … above the one … rests on"), not the banned cross-reference sense, so each is permitted per the rule's own carve-out. Every backticked code token I found (`` `z-index: 5` ``, `` `top: 100%` `` elsewhere unchanged) is a CSS value token, which the standing ruling exempts from the noun-after requirement.

**Claim 9 (reading parts) — CONFIRMED.**
- No `any`, `as` (type assertion), `!` (non-null), or suppression comment in `bfs.diff`: I grepped `\bany\b|\bas\b|!\.|@ts-|eslint-disable` and the only hits are the English word "as" inside prose sentences ("as did", "as in the showcase"), not TypeScript syntax.
- No nested function beyond a callback passed directly: every `=>` in the diff is an argument to `.map`, `.filter`, `.every`, `it(...)`, or `beforeAll(...)` — `bfs.diff:76` (`.map(({...}) => Object.freeze({...}))`), `bfs.diff:174` (`.filter(([, reading]) => …)`), `bfs.diff:236` (`.map((element) => […])`) — each is a callback argument, the permitted exception; no standalone function declaration or assignment appears.
- No helper duplicating an installed `@orkestrel/test` browser export: `readHit` is declared at `/home/user/veneer-bfs/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2115` (`export declare function readHit(element: Element): Element | undefined`), and `isRendered` at line 1539 of the same file; both are imported and called, not redefined, in `tests/app/browser/integration.test.ts` and `InputGroupSection.test.ts`. `readStates`, `readName`, and `readSpecimen` are unchanged imports per the diff (only `readHit` and `isRendered` are newly added to import lists).
- Off-limits files untouched: same evidence as claim 1's status read.
- The `npm run check` exit-code sub-part of claim 9 addresses the objective lane per the brief; I do not rule on it.

No findings outside claims 1, 3, 4, 9.

VERDICT: PASS
