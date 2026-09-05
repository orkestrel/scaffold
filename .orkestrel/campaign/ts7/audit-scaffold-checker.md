<!-- workflow wf_947dba29-54e, agent a726389b4b3b0f645, captured from journal.jsonl -->

Good — no hits. Now finalizing the verdict.

## Per-claim verdicts

**Claim 4 — range literals updated, none else moved.** MET, with one sub-part unresolved.

- `tests/src/core/constants.test.ts`: updated — `tmp/units/ts7-seven.diff.txt:897-928` splits the old bounded-below-7 test into a shared-range test (`extractRangeMajor(emitted)).toBe(7)`) and a browser-ceiling test (`toBe(6)`).
- `tests/src/core/compilers.test.ts`: updated — `diff.txt:879-880`, `:888-889` (`^6.0.3` → `^7.0.2`).
- `tests/src/bin/CLI.test.ts`: updated — messages at `diff.txt:830,839-840,848-849,858,867` (`^6.0.3`→`^7.0.2`, `~6.4.0`→`~7.4.0`); fixture registry two-major packument in both `FLEET_RELEASE_REPLIES` and `AUDIT_REGISTRY` at `diff.txt:791-800` and `:812-821`.
- Manifest snapshots `tests/src/core/fixtures/source-manifest.txt` and `setup-false-manifest.txt`: each one-line change, `diff.txt:931-956`.
- `tests/src/core/fixtures/app-only-toolchain.txt`: absent from the diff and confirmed unchanged by direct read (`/home/user/scaffold/tests/src/core/fixtures/app-only-toolchain.txt:15` still reads `"typescript": "^6.0.3"`), matching the browser-fork claim.
- `tests/src/bin/helpers.test.ts`: absent from the diff — its "untouched" state is confirmed directly (`grep` shows only inert fixture rows at lines 344-408 passed as arguments, none of them reading the emitted planned range). Its "green" state rests only on the writer's own report (`tmp/units/ts7-seven-report.md:80-81`, "245 passed") — no independent gate evidence was supplied to this checker, so that portion is UNRESOLVED, not CONFIRMED.

**Claim 5 — `host.json` carries only the two named digests.** MET. `diff.txt:232-251` is the entire `host.json` hunk: one changed `guides/scaffold.md` digest (line 241) and one changed root digest (line 250); read against the live file (`/home/user/scaffold/host.json:685`, `:775`) both match the diff's "after" values exactly, and nothing else in that hunk differs.

**Claim 6 — the prose.** MET on the mechanical sweep, with one referred item.

- `guides/scaffold.md` § Dependency floors gained the paragraph at `diff.txt:218-227` naming the 7 floor, the `typescriptCompilerFolder` override's reason, and the browser limit citing `vuejs/language-tools` issue 5381; the Surface row for `APP_BROWSER_TYPESCRIPT_RANGE` is at `diff.txt:210`.
- `PROPOSAL.md`'s amended sentences check true against `.orkestrel/campaign/ts7/orchestrator-measurements.md`: the pin and bridge (`orchestrator-measurements.md:8`), the control path's `typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)` returning a string (`orchestrator-measurements.md:34,61,68`, `61 ms` at line 65), the fallback reader being gone (`orchestrator-measurements.md:34,58`; `design-objective.md:91` F1), C12's `unstable/ast`/`unstable/sync` phrasing (`design-objective.md:11-13`), and the candidate table's `typescript` row (same measurements).
- `ROADMAP.md`'s scaffold rows (browser limit, and the three retirement rows) and the fleet row each end on a trigger sentence: `diff.txt:118-122` ("that release is the trigger"), `:123-128` ("The trigger is the next visit to either instrument"), `:129-134` ("The trigger is that probe"), `:135-143` ("The trigger is each subject's next visit"), `:151-163` ("The trigger is the scaffold release carrying this move, plus the owner's go-ahead").
- Substitution-table sweep of every added line in `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, and the touched TSDoc/comments found no clear hit: no `should`, `simply`, `easy`, `just`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, causal `since`, temporal `once`, `please`, `we`, `our`, `let's`, `ensure`, `guarantee`. One borderline hit: `ROADMAP.md` (`diff.txt:126`) — "the move is a law-conformance repair rather than **a new rule**." Whether this "new" names a value (a rule that does not yet exist) or dates one (a staleness claim the substitution table bans) is a sense judgment this checker will not make; **referred to the subjective lane**.
- No heading was added or renamed in this diff, so the sentence-case check finds nothing to rule on.
- No count of a growable set was found in the added prose (checked "two majors" in the CLI.test.ts comment — a fixed pair of specific version numbers describing test data, not a count of an open set, so it is not a hit).

**Claim 7 — scope honesty.** MET. `git status --short` (`tmp/units/ts7-seven.status.txt:1-16`) lists exactly the 16 files the diff touches, every one inside the brief's owned set (`package.json`, `package-lock.json`, `host.json`, the two vite configs, `src/core/{compilers,constants,templates}.ts`, the four test files, the two manifest snapshots, `guides/scaffold.md`, `PROPOSAL.md`, `ROADMAP.md`). The three untracked entries (`.orkestrel/campaign/ts7/probe-2-brief.md`, `probe-report.md`, `seven-report.md`) sit under `.orkestrel/` and are untracked (`??`), not committed, consistent with the claim. No evidence of a discarding git command appears in the diff or status (no unexplained reversion of unrelated files); this sub-claim is otherwise unfalsifiable from the supplied evidence and rests on the absence of contrary evidence rather than a positive check.

## Findings outside the claims

- The `helpers.test.ts` "green" reading (claim 4) and the "no discarding git command ran" reading (claim 7) rest only on the writer's self-report; no independent verifier evidence was supplied to this dispatch.
- The `ROADMAP.md` "a new rule" phrase (`diff.txt:126`) is a substitution-table sense judgment referred to the subjective lane, not ruled on here.

VERDICT: PASS none; outside the claims: helpers.test.ts-green-unresolved, roadmap-new-rule-referral
