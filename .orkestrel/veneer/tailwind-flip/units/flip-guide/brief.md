# Unit flip-guide (U7): the Tailwind flip's prose in the guide, the roadmaps, and the standing rulings

## Role and engine

Executor: an Opus agent dispatched by the Orchestrator with the Agent tool (not Codex; no `codex exec`
command applies). Tools: Read, Grep, Glob, Edit, Write, Bash. You are the sole writer in
`/home/user/veneer` and `/home/user/.wave/scaffold-main-wt` for this unit. This is a subjective prose
unit: the judgement is yours, the facts are the tests'.

## Objective

Rewrite the Tailwind prose of Veneer so it states the flipped design: Tailwind wins at every conflict;
the `@orkestrel/veneer/tailwindcss` sheet is the layer, Bootstrap for Tailwind, built from the `/home/user/veneer/src/bootstrap` partials
under four switches; Veneer ships no Tailwind. Retire the mirror, the exemption table, `revert-layer`
as a user-facing term, "Bootstrap with Tailwind", and "stylesheet set". Every claim cites a case title
in backticks that resolves to an `it(` title in `tests/**`. Land the flip's rulings in scaffold
`plan.md` § Standing rulings.

## Context

HEAD at brief time: veneer `1b15a22` (U2 sheet, U3 records, U4 integration committed). U7 launches only
after `flip-sheet-2` (U2b), `flip-showcase` (U5b), and `flip-journeys` (U6) are accepted and committed.
Every item marked "(re-read at launch)" depends on those units: read the final state from the files,
and read every case title from the test files, never from any brief.

Governing texts (read before writing):

- Verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`:
  § 1 R1-R10 (R9 lists the sections to rewrite), § 2 mechanism and the consumer table
  ("What a consumer reads"), § 3 surface and derivation pins, § 4 curation, § 5 showcase, § 6 records
  and proofs, § 7 Prose, § 8 item 8 (this unit), § 10 defaults, § 12 corrections (every entry; they
  override the earlier sections), § 13 U1 readings.
- Copy document `/home/user/scaffold/tmp/codex/flip-copy.md`: § 1 face labels (`Bootstrap only`,
  `Tailwind without the layer`, `Tailwind with the layer`; ruling 1.14 fixes the guide § Faces table),
  § 2.8 (the guide states 192 and 17 beside their pinning cases), § 7 vocabulary ("the layer", "face",
  "departure", "shared utility", "curated", "Bootstrap for Tailwind", "the recipe") and the retired
  words with their replacements.
- Law: `/home/user/scaffold/.claude/rules/writing.md` (§ Substitutions), `documentation.md` (every
  backticked case title resolves; `test:guides` drift; the README pitch equals the guide tagline; a
  number states its run), `styles.md` (Tailwind clauses, derived-build clause),
  `/home/user/scaffold/AGENTS.md` § Writing and the U0 amendments in § Project model.
- What each unit lands: `/home/user/scaffold/tmp/codex/flip-sheet-brief.md`, `flip-sheet-2-brief.md`,
  `flip-records-2-brief.md`, `flip-integration-3-brief.md`, `flip-showcase-brief.md` (with its
  appended rulings), `flip-journeys-brief.md`. Use them for intent only.

Final case titles at `1b15a22` (U3, U4 fixed; re-confirm with grep at launch):

- `/home/user/veneer/tests/conformance.test.ts` § `Tailwind compatibility recipe`: `pins the exclusion to the registry
  minus shared utilities after the Bootstrap tokens`; `excludes Bootstrap candidates while retaining
  px-8 and rejects a stripped exclusion`; `excludes theme-generated and user-defined Bootstrap names`;
  `excludes exact candidates while preserving authored selectors and variant and arbitrary names`;
  `pins the unexcluded Bootstrap census to accepted selector identities in the inventory`;
  `refuses apply of an excluded component utility and permits a shared utility`; `places properties
  before the literal order and Tailwind order and preflight before the tuned sheet`; `pins the recipe
  record to live compiles, candidate membership, and the built-sheet digest`; `pins the showcase recipe
  record to live compiles over the registry and the Tailwind specimens`.
- `/home/user/veneer/tests/integration.test.ts`: `keeps preflight and thumbnail max-width and lets an unlayered consumer
  win`; `keeps preflight declarations by value class and reboot declarations that preflight never
  writes`; `keeps hidden elements hidden and records the display utility departure`; `places properties
  below reset and rejects a separate Veneer sheet loaded first`; `reads preflight on bare headings,
  paragraphs, images, and lists and rejects a deleted base`; `lets preflight auto height override a
  sized image attribute under both Tailwind faces`; `partitions shared names, pins raw-composition
  incompatibility, and gives utilities to Tailwind and components to Bootstrap`; `keeps collapse show
  visible under the recipe and reads collapse visibility with the rule exposed`; `keeps every pair of
  built sheets disjoint in each shared layer`; `refuses a separate Bootstrap sheet beside the recipe
  because its important utility wins` (the misuse case); `pins the recipe CSSOM declaration sequence to
  the tuned sheet with the measured merge`; `reads 3px when a Tailwind order statement precedes every
  Veneer sheet`.
- `/home/user/veneer/tests/src/tailwindcss/index.test.ts`: `ships its declared order with reset and bootstrap ownership
  and unlayered importance`; `excludes every Bootstrap name except the shared utilities and exposes no
  source rule in CSSOM`; `pins every curation witness against the lifted sheet and rejects each removed
  repair` (re-read at launch: U2b).
- `/home/user/veneer/tests/setup.test.ts`: `pins the curation table and shared literals to their sources with planted and
  removed controls`; `reads only the unique curation table and rejects planted, removed, and malformed
  rows`; `assigns reset and bootstrap to the tuned sheet and refuses the mirror ownership`.
- `/home/user/veneer/tests/setupServer.test.ts`, `/home/user/veneer/tests/setupStyles.test.ts`: grep for Tailwind and preflight titles.
- Showcase and journey titles (`tests/app/browser/**`, `/home/user/veneer/tests/setupBrowser.test.ts`): (re-read at launch:
  U5b, U6). The old `reads the resolved values under its declared variant and both stylesheet sets`,
  `J4 compares the two stylesheet sets through the Stylesheets buttons`, and `J6 speaks no engine
  vocabulary under either stylesheet set` are expected to be renamed.

## Implementation

### Passage list (line numbers at `1b15a22`; re-locate by text at launch)

`/home/user/veneer/guides/veneer.md`:

| Lines | Passage | Ruling | Reason |
| --- | --- | --- | --- |
| 1197-1255 | `## Tailwind compatibility sheet` opening; 1202 names "the preflight mirror in the `base` layer" | rewrite | States the retired mechanism; becomes the ruling paragraph and the structure below |
| 1256-1284 | Mirror, `revert-layer`, exemption-table paragraphs; cites deleted `pins the complete mirror after one Sass round trip with exemptions read both ways`, `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win`, `keeps a reset layer value under the recipe and rejects a revert mirror`, `keeps the height attribute of a sized image under the recipe and rejects a revert mirror` | delete; replace with the curation lead | Mechanism retired; titles do not resolve |
| 1285-1287 | Lead into the table ("The mirror omits only a declaration that the following exemption table names") | rewrite | Becomes the curation table lead: three forms and the witness case |
| 1288-1317 | Curation table rows | keep (off-limits, U2/U2b own the rows) | `setup.test.ts` pins them |
| 1319-1339 | Prose after the table: the exemption both-ways reading, `[hidden]` row, `restores bare images and lists to lifted Bootstrap and rejects a removed mirror` | rewrite | Retired terms; title does not resolve; the hidden reading now cites `keeps hidden elements hidden and records the display utility departure` |
| 1341-1346 | Overrides table; row 1345 cites `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` | rewrite the cell and add the `dark:` and important-modifier rows (verdict § 7) | Title does not resolve; use `keeps preflight and thumbnail max-width and lets an unlayered consumer win` |
| 1458-1545 | `## Composition`, `### Load real Tailwind`: 1494-1500, 1527, 1542 name the mirror and cite `places properties before the literal order and Tailwind order and preflight before the mirror` | rewrite | Title renamed to `... preflight before the tuned sheet`; add the misuse refusal (verdict § 7) |
| 1546-1555 | `### Tailwind-first limit` | rewrite against verdict § 2 last row | Limit now names `reset` and `bootstrap` after `utilities`; cites `reads 3px when a Tailwind order statement precedes every Veneer sheet` |
| 1556-1664 | `## Compare Bootstrap and Tailwind`; 1656 cites `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped`; 1166-area tables citing `partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe`, `pins the exclusion statement byte for byte directly after the order statement`, `excludes every Bootstrap name in one directive and exposes no source rule in CSSOM`, `refuses apply of an explicitly excluded Bootstrap utility`, `reads only the unique preflight table and refuses malformed rows` (grep each) | rewrite | Titles do not resolve; relationships now partition to Tailwind (utilities) and Bootstrap (components) |
| 1665-1702 | `## Showcase` opening; 1668 "two stylesheet sets"; 1679-1680 old matrix title, "Bootstrap with Tailwind group" | rewrite (re-read at launch) | Three faces, copy § 1 labels, group title `Tailwind` |
| 1703-1755 | `### Faces`: table 1711, 1722-1754 (mirror `height: revert-layer`, specimen table columns `Bootstrap only`/`Bootstrap with Tailwind`) | rewrite to copy ruling 1.14; specimen table to three columns (re-read at launch) | Retired label and mechanism |
| 1756-1794 | `### Class coverage`; 1781 old matrix title | rewrite title references (re-read at launch) | Renamed case |
| 1795-1818 | `### Tailwind record`; 1797 "Bootstrap with Tailwind face" | rewrite | Faces now three; record has the `unexcluded` field |
| 1819-1830 | `### Census limit`; 1821-1828 | rewrite (re-read at launch) | Retired label, renamed case |
| 1948, 1962-1970 | Journey matrix row and J4/J6 prose: "both stylesheet sets", "Bootstrap with Tailwind" button | rewrite (re-read at launch: U6) | Renamed journeys and labels |
| 2142 | Portfolio region row "under the Bootstrap with Tailwind face" | rewrite | Label `Tailwind with the layer` |
| Elsewhere | Every non-Tailwind backticked title (for example `drives the modal table through its controls`, `keeps every fixed text color readable in the %s color mode`, `settles retained, configured, replaced, and destroyed lifetimes in the registry`, `exports only the Bootstrap registries with names keyed by their segments`) that fails the resolution check | report only, do not fix | Outside the flip; list under Unknowns in the return |

Other files:

| File and lines | Ruling | Reason |
| --- | --- | --- |
| `/home/user/veneer/guides/README.md` 26-28, 35-37 | rewrite the `@orkestrel/veneer/tailwindcss` and showcase rows if their wording names the retired design; keep links | Concept index must match the guide |
| `/home/user/veneer/README.md` | touch only if it names the Tailwind face or the mirror; the pitch must equal the guide tagline | documentation.md |
| `/home/user/veneer/ROADMAP.md` 15 (Tailwind tenet), 36 and 40 (`@orkestrel/veneer/tailwindcss` layer row and the "No face writes `base`" sentence), 44 (recipe), 54 (`/home/user/veneer/src/tailwindcss` export line), 82 and 85 (proof table `conformance` and `integration` rows: mirror, exemption, `revert-layer` counter), 101 (`_reset.scss` mirror line), 143 (landed Tailwind chunk), 144 (showcase line: two faces, "Bootstrap with Tailwind") | rewrite: tenet becomes "Tailwind wins at every conflict; Veneer ships no Tailwind; the layer curates"; the proof rows name the curation witness and the record version gate; 143 and 144 keep their history and add the flip's landing as a dated sentence | Verdict R9 |
| `/home/user/veneer/ROADMAP.md` 14 ("departure table ... exemptions in both directions") and 115 ("The Bootstrap partials mirror Bootstrap's source files") | keep | Bootstrap's departure table and the verb "mirror" for file layout are not the retired Tailwind terms; the sweep reports them as the named exceptions |
| `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/plan.md` § Standing rulings (line 9) | add the flip's rulings: Tailwind wins at every conflict; Veneer ships no Tailwind; the layer is Bootstrap for Tailwind built from the partials under four switches and curates; the three faces with the copy labels; the U0 law amendments by reference | Verdict § 8 item 8 |
| `/home/user/.wave/scaffold-main-wt/ROADMAP.md` | no change: it has no § Scaffold propagation and verdict § 8 U0 does not name it | Scope |

### Structure of the new `## Tailwind compatibility sheet`

1. The ruling in one paragraph: Tailwind wins at every conflict; the `@orkestrel/veneer/tailwindcss` sheet is the layer,
   Bootstrap for Tailwind, built from the `/home/user/veneer/src/bootstrap` partials under four switches; Veneer ships no
   Tailwind. Cite `ships its declared order with reset and bootstrap ownership and unlayered importance`.
2. The recipe, three lines, unchanged (verdict § 3). Cite the conformance recipe titles.
3. What the consumer never does: link `@orkestrel/veneer/bootstrap` beside the recipe. Cite `refuses a separate
   Bootstrap sheet beside the recipe because its important utility wins`.
4. The consumer table of verdict § 2 ("What a consumer reads", as corrected in § 12) with the three
   face columns, every value replaced by the measured value the cases read; each row cites its case.
   A row with no case is a deviation.
5. The curation lead and table (rows untouched): the three forms, and the witness case `pins every
   curation witness against the lifted sheet and rejects each removed repair` (re-read at launch).
6. The records and their version gate (verdict § 6, § 12): which record each case pins and the
   Chromium version gate; cite the record cases.
7. Numbers: 192 shared utility names, 17 shared component names, 73 `reset` rules, and any row count
   (1833, 199, 72, and others found by grep) each sit beside the case that pins it. A number with no
   pinning case is removed or is a deviation.

`## Showcase` / `### Faces`: the copy § 1.14 table verbatim, the face labels and toggle order of § 1,
what each face proves, with the final U5b and U6 titles (re-read at launch).

## Unknowns

- Final U2b, U5b, U6 titles and specimen readings (re-read at launch).
- Whether the misuse case and the `dark:` and important-modifier override rows have cases; if not, stop.

## Scope

Owned exactly:

- `/home/user/veneer/guides/veneer.md`: prose outside the curation table rows.
- `/home/user/veneer/guides/README.md`.
- `/home/user/veneer/README.md`, only if touched by the rules above.
- `/home/user/veneer/ROADMAP.md`: the Tailwind and showcase lines listed above.
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/plan.md` § Standing rulings.
- Scratch under `/home/user/veneer/tmp/` only.

Off-limits: every test (`tests/**`), every source (`src/**`), `app/**`, `showcase/**`, the curation
table rows, `package.json`, the lockfile, every other scaffold file, `.claude/**`, `AGENTS.md`.

Forbidden: installs, commits, pushes, credentials, destructive commands (`git reset`, `git checkout --`,
`rm -rf`, `git clean`), shared-file edits, and tree-wide mutating gates (`npm run format`, `lint`
with `--fix`). You are the sole writer in both checkouts.

## Execution

Run from `/home/user/veneer` unless named.

1. `git log --oneline -3` and `git status --porcelain`: confirm U2b, U5b, U6 are committed and the tree is clean.
2. Read the governing texts and the test files; build the title list with
   `grep -rhoE "\b(it|it\.each\([^)]*\)|describe)\(\s*['\`][^'\`]+" tests | sed -E "s/.*\(\s*['\`]//" | sort -u > tmp/titles.txt`.
3. Edit the passages above.
4. Retired-term sweep:
   `grep -n -i -E 'mirror|exemption|revert-layer|Bootstrap with Tailwind|stylesheet set' guides/veneer.md README.md ROADMAP.md`.
   Expected: zero hits except `ROADMAP.md` line 14 (Bootstrap's departure table, "exemptions") and line
   115 ("partials mirror Bootstrap's source files"), and any guide sentence stating Bootstrap's own
   departure table; report each surviving hit with its reason.
5. Banned-term sweep from `writing.md` § Substitutions over every touched file; report output.
6. Title resolution: extract every backticked span containing a space from the touched files and check
   each against the titles file of step 2 (a `%s` or `$name` template title matches its `it.each` form); report
   the unresolved list, split into flip titles (must be empty) and pre-existing non-flip titles.
7. Gates: `npm run test:guides`; `npm run test:policy`; `npm run format:check`; `npm run lint:check`;
   `git diff --check`; in the scaffold worktree `git -C /home/user/.wave/scaffold-main-wt diff --check`.

## Output

Return: the passage list with the disposition applied to each; the two sweeps' outputs; the title
resolution output; every gate's exit code and failure tail; `git diff --stat` in both checkouts.

## Deviation contract

Stop and report, without guessing, when: a case title the prose needs does not exist in the tests; a
number has no pinning case; a claim cannot be tied to a case; an edit would touch an off-limits path; a
gate fails for a reason outside the owned files.

## Acceptance criteria

1. `git diff --check` clean in both checkouts; changes only in owned paths.
2. Retired-term sweep matches the expected result.
3. Banned-term sweep clean.
4. Every backticked flip case title in the touched files resolves to an `it(` title.
5. `npm run format:check`, `npm run lint:check` exit 0.
6. `npm run test:policy` exits 0.
7. `npm run test:guides` exits 0.

## Review evidence

The Orchestrator verifies with `git status --porcelain`, the diff, and the gates above; no commit,
no push.
