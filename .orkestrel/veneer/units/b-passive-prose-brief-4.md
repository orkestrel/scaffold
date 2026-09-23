# Unit B-PASSIVE-PROSE — round 3 (successor brief 4): the bare tags, the counts, and the sweep

This brief succeeds `b-passive-prose-brief-3.md` (round 2, completed) and carries the round-2 audit verdict `bpp-audit-2-verdict.md`: claim 8 (counts in two rewritten lines), O1 (bare `{@link}` tags), O2 (the sweep pattern), O3 (the ledger), and the `renderRuleKey` observation. Everything round 2 landed in the worktree stays.

## Role and engine

`builder` on Sonnet, a native Claude subagent, reached as the Agent tool.

## Objective

Every `{@link}` tag in `tests/setupServer.ts` and `tests/setupStyles.ts` is followed by its D42 noun, the two counts are gone, and the sweep pattern that proves it crosses a doc-comment continuation.

## Context

**Evidence.** The objective verdict `/home/user/scaffold/.orkestrel/veneer/units/bpp-audit-2-objective-verdict.md` lists every site: O1 names the bare tags by line (`setupServer.ts` 179, 309, 339, 532, 843, 911, 1223, 1232, 1670, 1740, 2317, 2798; `setupStyles.ts` 140, 387, 562, 2891, 3008, 3855, 4302, 5053, with the symbol at each); claim 8 names `setupStyles.ts:3959-3960` ("the three rules") and `setupServer.ts:1987` ("carries hundreds"); the observation names `setupServer.ts:1395` ("this function"). Line numbers are those the lane read in `/home/user/veneer-bpp` after round 2; locate each site by its symbol.

**Law.** `/home/user/scaffold/AGENTS.md` (§ Writing: never state a count); `/home/user/scaffold/.claude/rules/{writing,typescript,tests}.md` (§ Code tokens: a code token is followed by a noun; TSDoc); D42 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` (a module-scope function's noun is `helper`, a class member's `method` or `member`, a constant's `constant`; a literal value token is its own noun). Skill: none. Guide: none (no guide sentence changes).

**Installed primitives.** None apply: this round edits doc comments only.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-bpp` (uncommitted round-1 and round-2 writes over `87ff1d0` in the three owned files); npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` (the host npm is 10.9.7 and the manifest refuses it); no network needed.

**Measurements.** The round-2 objective lane's Grep in multiline mode: `\{@link [^}]+\}\s*helper\s*\n\s*\*\s*returns` matches `setupServer.ts:1906-1907` (a tag whose noun sits before a continuation), which is the positive control for the corrected pattern.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; never edit them. The worktree's three owned files are dirty by design (rounds 1 and 2); do not revert anything. `git checkout`, `git restore`, `git stash`, `git reset`, and `git clean` are forbidden.

## Unknowns

None.

## Scope

**Owned.** `tests/setupServer.ts` and `tests/setupStyles.ts` (doc comments only). `tests/src/styles/components/button-group.test.ts` stays as round 1 left it; do not touch it.

**Shared (report-only).** `guides/veneer.md` (nothing this round).

**Off-limits.** Everything else, `src/**`, `app/**`, every other proof, and the vendored policy files included.

**What asserts the state this change ends.** Nothing: doc comments assert nothing.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, push, install, or destructive git command.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-bpp/tmp/units/bpp-report-3.md`: the ledger of every line this round changes (line, tag or phrase, before, after), the corrected sweep pattern with its command, its empty output, and its positive control (a planted bare tag in a scratch copy under `tmp/probe/`, or the `setupServer.ts:1906` control read with the noun removed in a copy), and each gate's command and result line. The report states no count, uses no term `.claude/rules/writing.md` § Substitutions bans (`currently`, `now`, `today` in the temporal sense included), and elides no command.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when a listed site is not a `{@link}` tag or the sentence cannot take the noun without changing its meaning. Decide, record, and carry on for the exact wording around each noun (an article added or a clause reordered so the sentence reads on the first pass).

## Acceptance criteria

1. Every site O1 lists reads `the {@link X} helper`, `the {@link X} constant`, or `the {@link X} member` (the getters `SheetReader.order` and `SheetReader.declarations`), with the article where English needs it; `collectImportantNames` at `setupServer.ts:532` reads as a noun phrase ("the proofs the {@link collectImportantNames} helper drives read as…" or an equivalent that keeps the meaning).
2. `setupStyles.ts` near `LIST_GROUP_ACTION_HOSTS` no longer says "the three rules" (the sentence names what separates the rules without the count), `setupServer.ts` near `indexRecordingKeys` no longer says "hundreds" (for example "and the cascade carries many"), and `setupServer.ts` near `renderRuleKey` reads "this helper" where it read "this function".
3. `grep -Pzo '\{@link [^}]+\}(\s*\n\s*\*)?\s*(?!(helper|constant|method|member)\b)[a-z]' tests/setupServer.ts tests/setupStyles.ts` returns nothing (every tag is followed, across a continuation included, by one of the four nouns or by punctuation); the round-2 verb-and-comma pattern rewritten as `\{@link [^}]+\}(\s*\n\s*\*)?\s*(is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds|hands|reports|raises|measures|answers|builds|refuses|does|passes|states|decodes|copies|drives|serves|sits|,)` returns nothing; the positive control (a copy with one noun removed before a continuation) makes the first pattern print the site.
4. `grep -n "this function" tests/setupServer.ts tests/setupStyles.ts` returns only `setupStyles.ts` (the `compileBreakpointRamp` remark, outside this round) or nothing.
5. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.

**Observations, not criteria.** The scoped `button-group.test.ts` run is unchanged from round 2 and is the Orchestrator's at landing.

## Review evidence

`git -C /home/user/veneer-bpp diff 87ff1d0` and `git -C /home/user/veneer-bpp status --porcelain` at hand-back, captured by the Orchestrator as `bpp-3.diff` and `bpp-3-status.txt`, and the report.
