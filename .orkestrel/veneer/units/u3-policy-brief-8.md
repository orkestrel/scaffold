# Unit U3-policy — successor brief 8: authorship is a directory-table row, restored without a git verb

## What changed and why

This brief supersedes `u3-policy-brief-7.md`, which ran partway and was stopped by the
Orchestrator because its step 7 ordered a barred git verb; the earlier briefs stand except where
this one says otherwise. The working tree may carry a partial application of brief 7 (the
rewrite of `readPolicyIndex`, the remarks, and the message had begun): read the current state of
the two test files first and complete every item below against it, changing nothing that is
already right. Round 6 ran both lanes on
`../u3-policy-audit-claims.md`. The subjective lane (`units/u3-policy-audit-analyst-report.md`)
refuted the design ruling under claim 7 and the Orchestrator agrees: an index *link* is
navigation, not authorship. This checkout's own `guides/README.md` links every dependency mirror in
prose (lines 52 to 58) and says in the same section that a mirror documents that package's
surface, not anything sourced here. Under the rule as landed, a mirror that lost its catalog row
would be swept as authored prose. That is the wrong signal.

The Orchestrator surveyed every fleet index on the host. Scaffold (`guides/README.md:32-34`), Test
(`:15-17`), and Veneer (`:28-31`) map a workspace directory to its guide in a table row of the
form `` | `src/styles` | [`tokens.md`](tokens.md) | ``, and link mirrors only in prose. That row
is authorship evidence: the workspace says this directory's guide is that file. The rule becomes:
a top-level guide is accounted for when it is the package's own, the index, a guide a
directory-table row of the index maps to, or a catalog row. A mirror linked in prose and dropped
from the catalog is a stray again — one actionable report — rather than a swept mirror.

This is a redesign of the reader, not a patch: `readPolicyIndex` reads directory-table rows, not
every link. The link-form widening of rounds 4 to 6 still applies, to the row's guide cell alone.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md` (the sweep
paragraph at `:1151-1157` alone). **Off-limits.** Everything else.

## Execution

1. **The reader (claim 7).** Rewrite `readPolicyIndex` to return, in first-row order and distinct,
   the guide name from every Markdown table row of the index (after `stripPolicyCode`) whose first
   cell is a backticked relative path (`` `src/styles` ``, `` `app/browser` ``) and whose second
   cell is a link to a sibling `<name>.md` in any of the accepted forms. Declare the row shape as
   an exported constant beside `POLICY_INDEX_LINK` (`POLICY_INDEX_ROW`, matching
   `| `<path>` | <link cell> |` with the path captured) and apply `POLICY_INDEX_LINK` to the link
   cell. Rename nothing else; `POLICY_INDEX_FILE` stays derived. Rewrite the remarks: what a row
   is, that a link outside such a row accounts for nothing, the fence, span, and unpaired-backtick
   limits.
2. **The pattern (claim 3).** Exclude `#` from both name classes so a fragment ending in `.md`
   cannot be captured as a name; exclude `\s`, `<`, and `>` from the fragment classes; let the
   `./` prefix compose inside the angle branch (`](<./sample.md>)`). Correct the remark that says
   duplicate group names are a `SyntaxError` "from Node 23 onward": they are a `SyntaxError`
   before Node 23 and permitted from 23. Add cases: `](sample.md#topic.md)` captures `sample`,
   `](<./sample.md>)` captures `sample`, `](sample.md#bad fragment)` does not match,
   `](sample.md#bad>)` does not match. Fix the comment at the bare-fragment case that says
   fragments occur only inside angle brackets.
3. **Portability (claim 5).** Move the `guides/absent.md` control and the assumption that the
   package is not named `other` into a `createPolicyScratch` root with a crafted manifest, index,
   and catalog, so no assertion against `process.cwd()` assumes a name any target could carry.
   The live-root case keeps only assertions derived from the workspace itself.
4. **Rows and labels (finding 9; analyst claim 7).** Give every `PolicyControl` row this unit
   added or changed a `violations` collection naming the expected `path`, `rule`, `message`, and
   `line` (read how the runner in `tests/policy.test.ts` consumes `violations` and match it), so a
   diagnostic on the wrong guide fails. Rename `rejects a top-level guide the catalog does not
   register` to name both conditions (no catalog row, no directory-table row). Add one row proving
   a guide linked in prose but mapped by no row is a stray while the same guide mapped by a row is
   accounted for (two rows, or one row with two fixtures, matching the file's shape).
5. **The ruling in both homes.** Rewrite `isPolicyStray`'s remarks and the `guides/scaffold.md`
   sweep paragraph: the four accountings; a directory-table row is the workspace's statement that
   the guide documents that directory; a mirror is linked in prose and mapped by no row, so a
   mirror the catalog stops registering reports as a stray, which names the catalog to refresh.
   Delete the sentence that said an index link is a claim to author the guide.
5b. **One word per concept (round 6 objective finding 10).** `.claude/rules/documentation.md`
   calls `guides/README.md` "the map" and its tables "the concept index" and "the directory
   index". Carry that vocabulary through: the file is the map (`POLICY_GUIDE_MAP`; rename
   `POLICY_INDEX_FILE` to `POLICY_MAP_FILE`), the table is the directory index
   (`POLICY_INDEX_ROW`, `POLICY_INDEX_LINK`, `readPolicyIndex`), and the violation message and
   every membership string read "guide is the package's own, the map, a guide the directory index
   maps, or a catalog row". No remark, message, or label mixes the two words for one concept.
   Also correct the remark at `tests/setupPolicy.ts:380-381` ("the angle-bracket branch alone
   admits a `#fragment`") and the case title at `tests/policy.test.ts:715`: both branches admit a
   fragment; only the angle branch admits a space (round 6 objective claim 3).
6. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).
7. **Prove it in the fleet.** With this checkout's two test files copied over the same paths in
   `C:/Users/mikes/WebstormProjects/veneer` and in `C:/Users/mikes/WebstormProjects/test`, run each
   target's policy project (`npx vitest run --config vite.config.ts --no-cache --reporter=dot
   --project policy`) and record the reading; then restore each target's two files by copying back the exact bytes you set aside before
   overwriting (copy each target's `tests/policy.test.ts` and `tests/setupPolicy.ts` to a scratch
   directory under the system temporary directory first; never run `git checkout`, `git restore`,
   `git stash`, `git reset`, or `git clean` anywhere — the permission floor bars every role from
   them) and confirm `git -C <target> status --porcelain -- tests/policy.test.ts
   tests/setupPolicy.ts` is empty.
   Before copying, confirm each target is clean at those two paths; if either is dirty, skip that
   target and report it. Veneer's tree is dirty elsewhere on purpose; only those two paths matter.
   Expected: Veneer's `guides/tokens.md` is accounted for by its `src/styles` row; Test reads green.

## Output

Write `u3-policy-report-8.md` and return its content: the diff summary; each new case's
and row's reading; the two targets' readings and restore confirmations; each gate's exit code and
final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file; a dirty
target at either path; a `violations` shape the runner does not consume as the brief assumes
(report the runner's actual contract). Decide and carry on from: the row regex's exact shape
within the described form, case order, wording within the meaning fixed here.

## Acceptance criteria

1. `readPolicyIndex` reads directory-table rows only; a link outside a row accounts for nothing
   (a control row proves it).
2. The pattern captures no fragment text as a name and rejects a fragment carrying a space or an
   angle bracket, each with a case.
3. No assertion against the live root assumes a guide or package name.
4. Every added or changed control row names its expected `path`.
5. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0 here;
   the policy project exits 0 in Veneer and in Test with these files in place; both targets are
   restored and clean at the two paths.
6. `git status --porcelain` here lists only `host.json`, `tests/setupPolicy.ts`,
   `tests/policy.test.ts`, `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the targets' outputs and
restore confirmations.
