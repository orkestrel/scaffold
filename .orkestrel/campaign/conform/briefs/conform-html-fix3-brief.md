# Unit conform-html fix round 3 — make the presence-guard block true of its list, then one breadth pass

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/html`. Perform the assignment directly and spawn nothing.

## Objective

Close the third objective round's finding F-1 in `/home/user/fleet/html/tests/guides.test.ts` — the presence-guard block's `claims` list omits guide fence lines whose values the file's transcriptions assert, while its comment and title claim every such line — and, because this is the third finding of one class at one door, run one bounded breadth pass over every sentence this unit added that describes an instrument's coverage, so that no other such sentence claims more than its artifact matches.

## Context

**Law.** `AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs ("Change a fence, change the transcription beside it"), `quality.md` § Instruments ("Treat a gap between what an instrument says it checks and what it actually matches as a defect in the instrument, not as a documented limit") and § Rounds and verdicts, `writing.md`; `guides/html.md`.

**The unit so far.** `conform-html-brief.md` is the unit's brief and `conform-html-report.md` its report through fix round 2; the tree carries the unit's uncommitted changes (the status evidence lists fourteen modified paths). The third audit round: checker PASS; objective lane (Opus, the recorded substitution for the dark Sol bench) held every claim and returned F-1, referrals R-1 to R-3, and one observation. Its exact text is retained at `/home/user/scaffold/.orkestrel/campaign/conform/units/l1b/html-objective-r3-direct.md`; read it in full before editing.

**F-1, as the lane wrote it.** `tests/guides.test.ts:522-525`: the comment at `:523-524` states "a fence edited away from its transcription reddens here rather than leaving a stale proof green", and the title at `:525` reads "carries every guide fence line the transcriptions copy". The `claims` list at `:526-560` omits fence lines the transcriptions assert values from, among them `sanitizeURL('/docs/page', SAFE_URL_SCHEMES) // '/docs/page'` (`guides/html.md:591`), `attributeOf(anchor, 'TITLE') // 'Home'` (`:597`), `sanitizeAttributes(anchor, SAFE_ATTRIBUTES, SAFE_URL_SCHEMES)` (`:598`), `scanComment('<![CDATA[x]]>', 0)` (`:558`), `scanRawText(...)` (`:560-561`), `renderHTML(pruned)` (`:497-498`), `narrow.document.category // 'document'` (`:471`), `isVoidElement('BR') // true` (`:616`), `isEmptyElement(image) // true` (`:626`), and the roundtrip lines (`:639`, `:642`, `:646`, `:647`). Editing `guides/html.md:591`'s trailing comment to `// ''` leaves every test green, because the transcription at `tests/guides.test.ts:497` asserts what the code returns, not what the guide says. The lane's list is illustrative ("among them"), not the population: derive the population yourself.

**R-2, the breadth pass.** Round 2 found a false count at `guides/html.md:43` and a false sentence at `tests/guides.test.ts:541` about the block's own lines; F-1 is the same class one line up. Rather than a fourth repair at the same door, read every sentence this unit added or rewrote that describes what an instrument covers — in `tests/guides.test.ts`, `tests/setup.test.ts`, and `tests/distribution.test.ts` (the diff at `/home/user/work/evidence/conform-html.diff` marks the unit's lines) — and for each, compare the sentence with what the instrument matches; correct the sentence or the instrument where they differ, and record every sentence read with its reading in the report, including the ones that were true.

**The observation.** `tests/guides.test.ts:292` carries `’` (U+2019) inside a test title while the report states that fix round 2 bound every non-ASCII literal in the block by code-point escape. Make the tree and the sentence agree: write the title with an ASCII apostrophe (escape it, or use a template literal, as the file's precedent does), and leave the report's sentence true.

**R-1.** `package.json`'s `test` chain never reaches the `distribution` project, which is the only execution of html-obj-5's scratch swap and html-obj-6's spawn change. Run `npm --prefix /home/user/fleet/html run test:distribution` after the gate chain and record it in § Gates; the Orchestrator runs it again at landing.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/html run <script>`, `npm --prefix /home/user/fleet/html test`, `npx …` behind a leading `cd /home/user/fleet/html && `, `git -C /home/user/fleet/html status --short`, `git -C /home/user/fleet/html diff`, and `node /home/user/scaffold/tmp/work/evidence.mjs html`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, no redirect except a runner's output into a file under `/home/user/work/evidence/html-proofs/`, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** Every gate is green on the tree as it stands (report § Gates after fix round 2; `test:distribution` 9 passed).

**Standing conditions.** none.

## Unknowns

The exact population of fence lines whose values a transcription asserts: derive it by reading each transcription in `tests/guides.test.ts` (the Patterns fences and the README pair) against the guide fence it copies, and list it in the report before editing the `claims` list.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/distribution.test.ts`, `guides/html.md` (only where a sentence about an instrument's coverage sits in prose the unit wrote), `README.md` (same condition).

**Shared (report-only).** Every other file; every other fleet checkout.

**Off-limits.** `src/**` (the round is closed on source), `.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/**`, `.mcp.json`, `.oxlintrc.json`, `.oxlintignore`, `.oxfmtrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `node_modules/**`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, tag, publish, install, delete a file, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Never add a dependency. Never suppress a diagnostic. Never leave a TODO, a skipped test, or a deferred row.

## Rows

1. **html-fix3-1 (F-1).** Extend the `claims` list in the presence-guard block of `tests/guides.test.ts` with every guide fence line whose value a transcription in that file asserts, so that the comment at `:523-524` and the title at `:525` are true of the list. Prove it the way the lane did: before the edit, capture a control by changing one omitted line's trailing comment in `guides/html.md` (for example `:591` to `// ''`), run `npm --prefix /home/user/fleet/html run test:guides` into `/home/user/work/evidence/html-proofs/fix3-claims-control-red.txt`, and read it green (the defect); restore the line exactly; after the edit, repeat the same mutation, read the guard red, restore the line, and read the suite green. Name the control files beside the row.
2. **html-fix3-2 (R-2 breadth pass).** For every sentence the unit added or rewrote that describes an instrument's coverage in `tests/guides.test.ts`, `tests/setup.test.ts`, and `tests/distribution.test.ts`, compare it with what the instrument matches; correct the sentence, or the instrument, where they differ. Record each sentence with its file:line and reading in the report.
3. **html-fix3-3 (the observation).** Write the title at `tests/guides.test.ts:292` without U+2019.
4. **html-fix3-4 (R-1).** Run `npm --prefix /home/user/fleet/html run test:distribution` after the gate chain and record its command and exit code in § Gates.

## Method

Rows in order. After row 3: `npm --prefix /home/user/fleet/html run test:guides`, then the gate chain `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each, reading each result (run the mutating `lint` and then `format` only to converge, then prove with the checks); then row 4. Then `node /home/user/scaffold/tmp/work/evidence.mjs html`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Rewrite `/home/user/scaffold/tmp/units/conform/conform-html-report.md` so it describes the whole unit as it now stands, with a `## Fix round 3` section naming F-1 and what closed it (the derived population and the control files), the breadth pass as a table of every sentence read with its reading, the U+2019 edit, and `test:distribution` under § Gates. Then regenerate the evidence files with `node /home/user/scaffold/tmp/work/evidence.mjs html`. Return the structured object with the same content. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a transcription asserts a value no guide line carries, when a sentence's correction needs a `src/**` edit, or when a gate reddens on something the rows did not touch. Decide, record, and carry on for an ancillary choice such as the order of the `claims` entries.

## Acceptance criteria

1. The control in row 1 reads green before the edit and red after it, restored to green; the files are named.
2. Every sentence in row 2's population is listed with a reading, and no listed sentence claims more than its instrument matches.
3. `tests/guides.test.ts` carries no U+2019.
4. `format:check`, `lint:check`, `check`, `build`, `test`, and `test:distribution` each exit 0.

**Observations, not criteria.** The whole-suite timing under concurrent load; the Orchestrator takes the deciding run at landing, including `test:distribution`.

## Review evidence

`/home/user/work/evidence/conform-html.diff` and `conform-html.status`; the report; the rows.
