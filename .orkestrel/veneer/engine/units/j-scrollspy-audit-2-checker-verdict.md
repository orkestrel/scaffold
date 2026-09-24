# J-SCROLLSPY audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 29 tool uses, 147 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Numbered verdicts (mechanical clauses, per `j-scrollspy-audit-claims-2.md`)

1. **CONFIRMED.** `types.ts` diff hunk (`j-scrollspy-2.diff:1371-1385`) shows the `link` summary reading exactly "Reads the link the last activation selected while it carries the `active` token, or undefined otherwise," matching the claim's quoted sentence verbatim. Two red-first case titles appear verbatim in `tests/src/browser/ScrollSpy.test.ts:948` ("keeps the ratios it read at construction…") and `:928` ("forgets the selected link at a refresh that no longer observes its section"), and the rows "a refresh keeps a selected link it no longer observes" and "the caller's threshold array is kept" and "the root is read once, at construction" appear in `j-scrollspy-mutations-2.log.txt:64,65,70` reddening those named cases.

2. **CONFIRMED.** Case titles "stops a delivery whose activate listener removes the selected link token, activating no later entry" (`ScrollSpy.test.ts:973`), "stops a delivery whose leaving write a reaction answers by restoring the token…" (`:1017`), and "stops an activation whose clearing write a reaction answers by restoring the token…" (`:1069`) are present verbatim, and the rows "the dispatch door reads no token", "a removal door admits a restored token at the leaving write", and "a removal door admits a restored token at the clearing write" appear in `j-scrollspy-mutations-2.log.txt:66-68` reddening exactly those cases (1 failed of 26 each).

3. **CONFIRMED** on the mechanical presence clause. The guide carries the exact sentences: `Delegate` class row "Activates data-attribute hosts through a root's delegated click listener and a scan at construction." (`guides/veneer.md:40`), `destroy` Methods row "restores each `active` token the scrollspy wrote or removed" (`:330`), the zero-scroll sentence "…the first activation ends the delivery" (`:822`), and the malformed-escape departure (`:939-940`). `test:guides` is green (`j-scrollspy-gates-2.log.txt:80-85`, 19 passed).

4. **CONFIRMED.** No added diff line matches `instanceof` (empty grep result over the full diff). Two added lines use `isInstance(event, CustomEvent)` and `isInstance(event.target, Element)` (`j-scrollspy-2.diff:1684,1952`), both inside test files. The `as const` near line 605 of the test file is a literal-tuple assertion, not a type assertion on a declared contract; permitted under `.claude/rules/typescript.md`.

5. **CONFIRMED.** Each of the five named rows ("the observer identity is not read", "the activation's early return is dropped", "the margin parser refuses a valid margin", "the default active token is one the nav cascade does not paint", "destruction keeps the selected link") appears in `j-scrollspy-mutations-2.log.txt:69,71,74,73,72` reddening exactly the case named in the claim, with matching failed counts (report's quoted excerpt at `j-scrollspy-report-2.md:56-66` matches the log verbatim).

6. **CONFIRMED.** Status (`j-scrollspy-2-status.txt`) lists exactly the round-1 owned files plus `types.ts`, all inside the brief's owned set, no off-limits file. `types.ts` diff hunk touches only the `link` and `destroy` summaries (two hunks, `j-scrollspy-2.diff:1371-1385`). Every named gate is green in `j-scrollspy-gates-2.log.txt` (`check:src:browser` line 18, oxlint line 21, oxfmt line 28, `test:src:browser` line 72/241 passed, `test:guides` line 85/19 passed, `test:policy` line 98/109 passed|1 skipped, three builds lines 120/132/145, `test:conformance` line 158/22 passed, `test:setup` line 196/267 passed, tree-wide `check` line 576). The mutation log (`j-scrollspy-mutations-2.log.txt`) holds 73 rows (lines 2-74) each `EXACT` or `JOINED`, the five `GREEN? … 0 failed` rows (lines 75-79), and `receipt: restored byte for byte` (line 81); digests before/after are identical (lines 1, 80). No added line carries `any`, a type-assertion `as`, non-null `!`, `@ts-`, `eslint-disable`, an access modifier, a default export, or a `.bs.` wire name outside `constants.ts`'s defaults or the guide's Bootstrap-side compatibility-table prose (`j-scrollspy-2.diff:546,688-694`, all guide table rows). Every invoked element guard added in `ScrollSpy.ts` reads `isInstance` (verified by direct read of the file). The report records at line 3 that no `prove` call was made.

## Checklist of additional items

| Item | Met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits | met | `j-scrollspy-2-status.txt` matches brief's owned-file set exactly |
| `types.ts` hunks touch only `link`/`destroy` summaries | met | `j-scrollspy-2.diff:1371-1385`, two hunks only |
| Report case titles appear verbatim in test files | met | grep of `ScrollSpy.test.ts` and `parsers.test.ts` returned all cited titles at exact lines |
| Report mutation rows match instrument log (count, case) | met | `j-scrollspy-report-2.md:56-66` vs `j-scrollspy-mutations-2.log.txt:64-74` — identical |
| Log ends with digest receipt | met | `j-scrollspy-mutations-2.log.txt:80-81` |
| No `.bs.` wire name outside `constants.ts`/guide prose | met | only guide compatibility-table hits found |
| No forbidden syntax in added lines | met | zero matches for `any`, type-assertion `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifiers, default export |
| `isInstance` on element guards | met | `ScrollSpy.ts` read directly, all guards use `isInstance` |
| `ScrollSpy.ts` holds one class plus imports | met | full file read: imports then one `export class ScrollSpy` |
| Substitution-table hits in added prose | met (none found) | grep pattern (case-insensitive) over full diff's added lines for banned terms, `j-scrollspy-2.diff` — no matches |
| Shared-file patches name only permitted files | met (vacuous) | report's Deviation state: "no shared-file patch is outstanding" |
| No `prove` call, recorded | met | `j-scrollspy-report-2.md:3` |
| `plugin` row reads `shipped` with Proof `ScrollSpy.test.ts` | met | `j-scrollspy-2.diff:691` |

Not independently verified in full (outside effort budget for this pass, and not load-bearing for the mechanical verdict): barrel-export-list exact match against every name `index.test.ts` asserts, every added Summary-cell/description-paragraph equality, and every added summary's verb form — spot checks on the cited rows found no discrepancy.

## Referrals

None. Every item above closed on direct evidence; no judgment call was required for the mechanical clauses this brief assigns to the checker.

VERDICT: PASS
