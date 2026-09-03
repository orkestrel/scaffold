# Verdict — unit conform-markdown, round 1

**Lane held:** OBJECTIVE — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. Executor: `reviewer` on Claude Opus 5, read-only, clean context.

**Method:** read the distillate first, then attacked the tree directly. I re-derived every old-form sweep myself, opened every applied site, read the full added test section, read the guide fence population, read every proof and gate capture, and read the diff hunks for each touched file. The distillate ruled nothing.

## Per-claim verdicts

**1. Every row dispositioned, none silently skipped — CONFIRMED.**
All rows carry a disposition (`conform-markdown-report.md:10-20`): nine `applied`, two `noop`. I reproduced both `noop` grounds independently rather than accepting the report. `isBrowserVuePath` has zero hits package-wide (case-insensitive, excluding `node_modules`), and `/home/user/fleet/markdown/tests/setup.ts:48-122` exports `TEST_SEED`, `firstBlock`, and the `assert*Node` family, so fleet-F1's sole-export branch does not fire. `/home/user/fleet/markdown/src/core/Markdown.ts:54-56` declares the only class, opening `readonly #document` and `readonly #spans`; `readonly id: string` has zero hits in `src`, so fleet-F2's trigger shape is absent.

**2. Each applied row implements the refuter's operative repair — CONFIRMED.**
Every amendment landed and no struck alternative did. subj-1: `guides/markdown.md:52` keys `MarkdownHandlerMap<T>` and stays beside `MarkdownHandler<TNode, T>` at `:51`. subj-4: the row is gone (`conform-markdown.diff:17-23`) and `probe.md`/`test.md` appear nowhere in `guides/README.md:17-46` — the finder's alternative was struck as ruled. obj-1: `collapseSpace` sits at `src/core/helpers.ts:46`, between `attributeOf` and `foldNode as foldHTMLNode`, the refuter's ASCII-order correction, not the finder's "alphabetical". obj-4: `src/core/types.ts:103,114` follow `EmphasisBounds`, guide rows at `guides/markdown.md:24-25` follow the `EmphasisBounds` row at `:23`. obj-3: `parsers.test.ts` changed two lines only; the 1000 ms ceiling is untouched (`conform-markdown.diff:1007-1011`).

**3. No old name survives — CONFIRMED.**
I ran the sweeps myself over `/home/user/fleet/markdown` excluding `node_modules`: `MarkdownHandlers` (word-boundary and case-insensitive, covering the `-s`/`-ed`/`-ing` inflections), `Date.now(`, `isBrowserVuePath`, and `.replace(/\s+/g, ' ').trim()` all read zero. That population strictly contains `src`, `tests`, `guides/markdown.md`, `guides/README.md`, and `README.md`. The writer's recorded sweep names the root and the exclusion rather than the five paths individually (`conform-markdown-report.md:215-232`); that is a superset with its bound stated, so the claim's substance holds. No compatibility alias was introduced — the zero-hit sweep proves it.

**4. Failing-first proofs and old-form sweeps — REFUTED.**
The behavioural half holds fully. `markdown-obj-1-control-red.txt:12,37,70` names both repaired sites and reads `2 failed | 602 passed (604)`; `markdown-obj-1-green.txt:11` reads `604 passed`; both tests are in the diff at `conform-markdown.diff:963,980` with names matching the failures verbatim. `markdown-obj-2-control-red.txt:12,31,952` reddens one executed transcription and one presence guard; `markdown-obj-2-green.txt:11` reads `58 passed`.

The sweep half fails for one row. **markdown-subj-4 carries no recorded old-form sweep.** The report's § Sweeps table (`conform-markdown-report.md:218-232`) has no row for `guides/src` or `Dependency mirrors`, and § markdown-subj-4 (`:44-48`) records only the deletion. The brief's § Method requires a documentation row to record the sweep proving its old form gone. The substance is sound — I swept `guides/src|Dependency mirrors` case-insensitively across the package and read zero hits — so **no code change closes this; the report closes it.**

*Right looks like:* add to `conform-markdown-report.md` § Sweeps the row `| \`guides/src\|Dependency mirrors\` | package | 0 |`, matching the format of the rows already there.

**5. Guide parity — CONFIRMED.**
`MarkdownInterface` declares exactly `walk`, `find`, `filter`, `span`, `map`, `reduce`, `fold`, `stream` as call signatures (`src/core/types.ts:602-642`); the Methods table at `guides/markdown.md:205-212` carries exactly those and no more, with `document` correctly left as a Surface row rather than a method. The new exports reach the barrel through `src/core/index.ts:1` and are documented at `guides/markdown.md:24-25`; the guide's own suite asserts that in both directions. Fences import the published specifier (`guides/markdown.md:533-543,608,863`). No `AGENTS §` citation survives in any touched file — my `§` sweep found only anchor-link section references in `guides/markdown.md`, plus vendored mirrors and `tests/setup.ts:54`, none of them touched files.

**6. Breaking changes named — CONFIRMED.**
`MarkdownHandlers<T>` → `MarkdownHandlerMap<T>` is the only rename or removal in the diff; `src/core/types.ts`'s hunks (`conform-markdown.diff:265-322`) add and rename but remove no export. It is named at `conform-markdown-report.md:276-288` with its consumers and the obliged edit (none). I verified the consumer claim independently: `MarkdownHandlers` has exactly one hit across `/home/user/fleet` outside `node_modules`, and it is the vendored mirror `/home/user/fleet/guide/guides/markdown.md`, not source. `LinkScan` and `EmphasisScan` narrow two structurally identical anonymous return shapes, which is source-compatible. See finding F1 for the mirror.

**7. Scope containment — CONFIRMED.**
The diff carries exactly nine `diff --git` headers (`conform-markdown.diff:1,33,126,150,261,323,869,918,999`), matching `conform-markdown.status:1-9` line for line, and every path is under the brief's Owned row. `package-lock.json`, `node_modules`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` appear in neither. No shared file and no vendored mirror was written. No alias, re-export, or shim was added, proven by the zero-hit `MarkdownHandlers` sweep.

**8. Residue-free and gates named — first conjunct CONFIRMED; independent gate reading NOT-EVIDENCED.**
An added-line sweep over the diff for `.skip(`, `.only(`, `.todo(`, `retry`, `timeout`, `TODO`, `FIXME`, `console.`, `debugger`, `@ts-`, and `eslint-disable` returns zero. § Gates (`conform-markdown-report.md:247-253`) names `format:check`, `lint:check`, `check`, `build`, and `test`, each with its command and exit 0. No capture contradicts it: a sweep for `error`, `failed`, or `warning` across `gate-*.txt` hits only the `oxlint` invocation line, and `gate-test.txt:15,29,43,57,71` matches the reported readings exactly.

**The independent gate reading is `NOT-EVIDENCED`.** No read-only lane can take it; the Orchestrator's deciding run at landing settles it. Per the dispatch this is neither `FAIL` nor `UNRESOLVED`, and the terminal line does not turn on it.

**9. Nothing hidden — CONFIRMED.**
The residue sweep of claim 8 covers this. I read the entire added test section (`tests/guides.test.ts:213-691`): the comment blocks at `:213-217` and `:249-257` are explanatory prose, not commented-out code. The disposition table matches the diff row for row — I opened each of the nine applied sites and each matches its table entry. The report also discloses what it did not fix, under § Observations for the Orchestrator, rather than leaving it silent.

## Findings outside the claims

**F1 — the vendored mirror at `/home/user/fleet/guide/guides/markdown.md` goes stale on publish.**
`guides/README.md:34-39` in each consumer declares its mirror byte-identical. `@orkestrel/guide` vendors `markdown.md` and its copy still names `MarkdownHandlers` at the sites this unit renamed. The unit was right not to touch it (Shared, report-only), but the obligation exists and appears nowhere in the report. *Right looks like:* add to `conform-markdown-report.md` § Breaking a line naming `/home/user/fleet/guide/guides/markdown.md` as a mirror that must be refreshed — refreshed from the published bytes, never rewritten, per `.claude/rules/documentation.md` § Parity — in the publish wave after `@orkestrel/markdown` releases the renamed guide.

**F2 — `conform-markdown-report.md:86-91` misstates its own work.**
It says each module-scope fence helper "sits at the test file's module scope with the fence's own name and body". True for `adopt` (`guides/markdown.md:611` = `tests/guides.test.ts:220`) and `extractSurfaceNames` (`:866` = `:241`). False for the house-rule fence: the fence names its function `projectHTMLNode` (`guides/markdown.md:546`) and declares a second function `project` (`:560`); the test declares `projectKbdNode` (`tests/guides.test.ts:226`) and inlines `project`'s fold into the case body at `:363-372`. The code is correct — a module-scope `projectHTMLNode` would collide with the `@src/core` import at `tests/guides.test.ts:52`, and `projectKbdNode` is the `{verb}{Noun}` form `.claude/rules/tests.md` § Shared test infrastructure requires. Only the sentence is wrong. *Right looks like:* replace the clause with one naming the rename, its cause (the import collision), and the fact that `project`'s body is inlined into the case.

**F3 — `conform-markdown-report.md:253` states a count.** The Command cell reads "five projects", a number answering "how many" about a set anyone can add to, with no members named. `AGENTS.md` § Writing forbids it and says to delete rather than correct. *Right looks like:* name the members — `src:core`, `policy`, `config`, `setup`, `guides` — which the Reading cell of the same row already does.

Two smaller inaccuracies, recorded and not raised as separate findings: the § Gates Command cells abbreviate the executed commands, dropping `--config .oxfmtrc.json` (`gate-format-check.txt:3`) and `--config .oxlintrc.json` (`gate-lint-check.txt:3`); and `conform-markdown-report.md:42` calls the tightened By-directory table "byte-for-byte the shape the html sibling carries", where the structure matches (`/home/user/fleet/html/guides/README.md:13-15`) but the Guide cell text and width necessarily differ.

## Referrals to the Orchestrator

Each is real, outside every row of this unit's brief, and carried by nothing.

- **`tests/setup.ts:54` cites `AGENTS §1 / §16`.** I reproduced it. It is the only remaining `AGENTS §` citation in a package-owned file, it sits inside the shared brief's claim S6 population, and the subj-2 refuter flagged it as needing its own carrier. Report observation 1 names it; it needs a row in a successor brief.
- **`guides/README.md:20` states a count** — "one of this package's two runtime dependencies" tallies a set that can grow. Outside this diff's hunks, so untouched by any row. Report observation 2 names it.
- **`tests/setup.ts:3` names `setupBrowser.ts`**, which does not exist in this workspace. Same residue class fleet-F1 targets, but outside that ruling's trigger, so the unit correctly did not act. No carrier and no report entry. Needs a row or an explicit ruled `noop`.
- **`tests/setupPolicy.ts` carries a `@param … Whether` block.** Vendored and off-limits here; the repair belongs to `@orkestrel/scaffold`'s `dist/host` surface. Report observation 3 names it.

## Claims attacked and held

I attacked claims 2, 3, 4, 5, 6, 7, and 9 hardest, because my own engine wrote the subject. Specifically: I re-ran every sweep rather than reading the recorded result; I checked that no guide fence *value* was edited to make a transcription pass, reading all 91 lines of the `guides/markdown.md` hunks and confirming they contain only the rename, the two added Types rows, the two signature-cell updates, and the See-also repair; I derived the fence population independently (20 `ts` fences at `guides/markdown.md:270`-`:877`, each mapped to one of the 20 transcription pairs, which reconciles with `58 = 18 + 40` and the first-run `54 = 18 + 36`); I confirmed the refuter's named fence minimum — `renderMarkdown`, `renderHTML`, `htmlToMarkdown`, `span`, `fold`, `stream`, scanner — is met; I confirmed neither planted control defect left residue (`src/core/helpers.ts:912,1018` both return `located.end`, and `tests/guides.test.ts:649` pins the guide's `link?.end // 21`); and I checked the module-scope test helpers against `.claude/rules/tests.md` and the established form at `/home/user/fleet/markdown/tests/setup.test.ts:53-127` and `/home/user/fleet/contract/tests/guides.test.ts:210`, which holds the writer's ancillary decision. All held except claim 4.

VERDICT: FAIL 4; outside the claims: F1, F2, F3
