<!-- Agent dispatch, checker lane over the round-2 claims and the fix-d slice, captured from the task transcript -->

All four new test cases exist in the current tree at the cited names. This is enough evidence to rule.

## Verdict

**Claim 1 — Round-2 audit brief claims 1–13 hold mechanically on the tree as it stands.**
PASS. Both reviewer lanes independently ruled PASS on 1–13 against the post-fix-c tree (`u7-fix-audit-verdict.md:7`, "Both reviewer lanes: PASS on every claim, 1 to 13"). Fix-d's slice (`u7-fix-d.slice.diff.txt`) only adds sentences/tests and one ordering guard in `TypeStage.#inspect`; it touches none of the mechanisms claims 1–13 assert (`#configure`'s stdout-only read, `#check`'s diagnostic-first branch, `#issues`' path projection, `collectWorkspaceFiles`, the symbolic-link ruling, `scanDiagnostics` shapes, `loadWorkspaceVitest`, `#displace`/`#createMirror`, `normalizeValue`, the `Issue` example, and scope honesty), and none of fix-d's edits reverse language those claims rely on. No fix-d edit contradicts a prior PASS.

**Claim 2 — Fix-d edit 1 (drafted-`.json` exception in guide row and class TSDoc).**
PASS. `guides/probe.md:261` (via `u7-fix-d.slice.diff.txt:7-8`) reads "...raises a `workspace` / `malformed` failure, unless the `.json` file is one the claim itself drafted." `src/server/stages/TypeStage.ts` class TSDoc (`u7-fix-d.slice.diff.txt:84-91`) carries the identical exception clause. Both match the brief's exact words (`u7-fix-d-brief.md:31`).

**Claim 3 — Fix-d edits 2 to 7.**
PASS on all sub-parts, evidenced individually:
- `destroy` `@returns`: `src/core/types.ts:478` reads "A promise that settles after every stage has released its resources" (`u7-fix-d.slice.diff.txt:58-59`), matching the brief verbatim.
- `OverlayInterface` remarks: `src/server/types.ts:132-134` name "the runtime stage's module resolver reads one candidate set through its adapter and is the stage that holds an overlay; the type stage writes each draft into its mirror and the lint stage opens each draft as a document, so neither holds one," matching the brief verbatim (`u7-fix-d.slice.diff.txt:117-120`; confirmed directly at `/home/user/fleet/probe/src/server/types.ts:132-135`).
- `RuntimeStage.ts:699-705` and `guides/probe.md:1002-1004` rewrap: read directly, no line exceeds a reasonable width and both sit as one continuous re-wrapped block (`/home/user/fleet/probe/src/server/stages/RuntimeStage.ts:699-705`, `/home/user/fleet/probe/guides/probe.md:1002-1004`).
- Skip form: `it.runIf(LINKS)` confirmed at `u7-fix-d.slice.diff.txt:184`.
- Digest sentence split: `guides/probe.md:707-709` (via `u7-fix-d.slice.diff.txt:23-24`) splits the canonicalization into its own sentence beginning "`computeDigest` canonicalizes the record:", matching the brief's prescribed text.

**Claim 4 — Fix-d edit 8 (digest ordering, direct entry point).**
PASS. `TypeStage.ts` `#inspect` adds `for (const selected of groups.keys()) await this.#configure(selected)` followed by `this.#refuseDestroyed()` (`u7-fix-d.slice.diff.txt:99-102`), with a comment stating the invariant. The pinning test `"resolves a project's digest before an inspection's own draft of that project can move it"` exists at `/home/user/fleet/probe/tests/src/server/stages/TypeStage.test.ts:757` and compares a fresh stage's post-inspection digest against a first stage's pre-draft digest for the same project (`u7-fix-d.slice.diff.txt:207-231`).

**Claim 5 — Fix-d edit 9 (drafted-`.json` branch pinned).**
PASS. The test `"reports a malformed drafted json file as the claimants own issue"` exists at `/home/user/fleet/probe/tests/src/server/stages/TypeStage.test.ts:918`, drives a workspace with `resolveJsonModule: true`, drafts `src/settings.json` malformed, and asserts every returned issue is `origin: 'claimant'` at `path: 'src/settings.json'` (`u7-fix-d.slice.diff.txt:241-280`). The brief's no-location stop condition did not fire — the report records the compiler's located stdout under Unknowns (`u7-fix-d-report.md:68-76`) — so the "or the report records the no-location refusal" branch of the claim is correctly inapplicable; the first branch (a test pins a claimant issue at the drafted path) is satisfied.

**Claim 6 — Fix-d edit 10 (no-diagnostic branch, both fault messages pinned).**
PASS. `"reports a non-zero exit with no diagnostic as an instrument fault"` (`tests/src/server/stages/TypeStage.test.ts:1036`) asserts `origin: 'instrument'`, `code: 'malformed'`, `message: 'The compiler reported no diagnostic and exited 3'`. `"reports a signal-ended check run with no diagnostic as an instrument fault"` (`tests/src/server/stages/TypeStage.test.ts:1083`) asserts the sibling signal message. Both use a protocol-faithful stub `node_modules/typescript/bin/tsc` written by the test, not the real installation (`u7-fix-d.slice.diff.txt:296-389`).

**Claim 7 — Fix-d edits 12 and 13.**
PASS. Edit 12: the renamed case reads `"lowers the one-based line and column to zero-based over three located lines"` with no "non-BMP" wording (`u7-fix-d.slice.diff.txt:172-173`; grep confirms no "non-BMP" string anywhere in the tree). Edit 13: `deadline: PROBE_DEADLINE` and the message template both use the same constant (`u7-fix-d.slice.diff.txt:135-165`), `PROBE_DEADLINE = 30_000` is confirmed at `/home/user/fleet/probe/src/core/constants.ts:94`, and the comment states the contended-host reason ("a saturated host showed twice on 2026-09-06," `u7-fix-d.slice.diff.txt:142-144`). "No other budget changed" holds: the only other `deadline: 15_000` in the file, at `tests/src/server/Probe.test.ts:794`, belongs to an unrelated, unnamed case and is unchanged, as the report's own Deviation section documents (`u7-fix-d-report.md:106-120`).

**Claim 8 — Scope honesty.**
PASS. The fix-d.status.txt file list (21 paths) is fully accounted for: every path is either part of the tree already dirty before fix-a (per `u7-fix-a-brief.md:28-34`'s recorded pre-dispatch `git status`) or added within fix-b's owned scope (`src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/ProbeServer.test.ts`, `src/server/Probe.ts`, per `u7-fix-b-brief.md:47-51`). `package.json`, `package-lock.json`, and every vendored file are absent from the status list. The fix-d report's file list (`u7-fix-d-report.md:3-12`, 8 files) matches the fix-d slice diff's file set exactly. Fix-a/b/c reports' file-vs-diff match was already independently reconciled by the round-2 objective lane (`u7-fix-audit-verdict.md:7`, "the objective lane reconciles every report's file list against the tree diff... and rules PASS"), which I treat as corroborating, not self-report, evidence.

VERDICT: PASS
