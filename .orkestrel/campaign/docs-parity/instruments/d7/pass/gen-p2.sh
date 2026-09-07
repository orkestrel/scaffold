#!/usr/bin/env bash
# gen-p2.sh <pkg>: writes /home/user/scaffold/tmp/units/d7n-<pkg>-converge-brief.md from the pilot's A.2 shape, the live facts
# block (facts.sh, taken on the P.1 baseline), the P.1 report's docs worklist, and the template corrections. Read-only.
set -u
n=$1; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
OUT=/home/user/scaffold/tmp/units/d7n-$n-converge-brief.md
REPORT=/home/user/scaffold/tmp/units/d7n-$n-prep-report.md
cd "$d" || exit 9
tip=$(git rev-parse --short HEAD); ver=$(node -p "require('./package.json').version"); range=$(node -p "require('./package.json').devDependencies['@orkestrel/guide']")
spec=$(grep -o '\[`[a-z]*\.md`\]' guides/README.md | head -1 | tr -d '[]`'); [ -z "$spec" ] && spec=$n.md
facts=$(bash $SCR/facts.sh $n)
docs=$(timeout 120 npm run docs 2>&1 | grep -v '^$' | grep -v '^>' | tail -80; echo "exit ${PIPESTATUS[0]}")
readme_item=""
if [ "$n" = codec ]; then
readme_item="- **codec's README** duplicates the guide's Surface tables (\`README.md:9-40\`, three tables the gate never reads); a copy drifts the moment a cell is rewritten, so the README keeps its blockquote and onboarding and replaces each copied table with one sentence linking the guide's section (\`[Codings](guides/codec.md#codings)\` and its siblings), the shape scaffold's own README took in D5."
fi
probe_item=""
if [ "$n" = probe ]; then
probe_item="- **probe's suite** keeps its hand-rolled proofs and gains the three cases and a \`manifest lists at least one guide\` assertion (ruling 7); P.1 turned \`## By concept\` into the table \`parseManifest\` reads."
fi
cat > "$OUT" <<EOF
# Brief — P.2 \`d7n-$n-converge\` ($n under the equality gate)

## Role and engine

\`implementer\` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in \`$d\` from the committed baseline \`$tip\` (clean; \`@orkestrel/guide@0.0.18\` installed \`--no-save\` while \`package.json\` declares \`$range\`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version \`$ver\`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

\`guides/$spec\` passes the equality gate: every \`## Surface\` and \`## Methods\` table heads \`Summary\` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one \`@example\` is titled with a fence's heading and equals its body; \`tests/guides.test.ts\` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; \`npm run docs\` exits 0 at a non-zero \`rows read\` and \`disagreements found: 0\`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. \`/home/user/scaffold/AGENTS.md\`; \`.claude/rules/documentation.md\` § Parity; \`.claude/rules/writing.md\`; \`.claude/rules/tests.md\`.
2. \`$d/guides/$spec\`, \`README.md\`, \`tests/guides.test.ts\`, every \`src/**\` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: \`/home/user/fleet/abort/guides/abort.md:1-16\` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), \`:52-60\` (the \`### Classes\` table), \`:154-160\` (§ Tests naming the checks descriptively); \`/home/user/fleet/abort/README.md:1-10\` (the pitch as the same blockquote, the onboarding paragraph); \`/home/user/fleet/abort/tests/guides.test.ts:31\` and \`:45\` (\`GUIDE_SPEC\`, \`ROOT_FILES\` with \`README.md\`), \`:62-110\` (the manifest assertion, the pin in the inline form, the README case with its guards), \`:172-190\` (the equality case inside the manifest loop). The guide's own converged shapes at \`/home/user/fleet/guide/guides/guide.md:1-24\` and \`:202-213\`.
4. \`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md\` rulings 2 to 7 and 10, and § Template corrections; \`rulings.md\` § Ruling 6 and § Ruling 7; \`orchestrator-measurements.md\` § P16 and § P19.
5. The prep unit's report, \`$REPORT\`, for what P.1 changed and the first \`docs\` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every \`## Surface\` and \`## Methods\` table heads \`Summary\` beside only \`Kind\`, \`Shape\`, \`Signature\`, \`Value\`, or \`Returns\`. A \`Behavior\`, \`Purpose\`, \`Describes\`, or \`Builds\` column is renamed \`Summary\`; a table carrying \`Shape\` and no compared column gains \`Summary\` as its last column, the type literal staying in \`Shape\` and the clause after an em dash moving into the doc block verb-first. The first column's header text (\`API\`, \`Name\`, \`Type\`, \`Method\`, \`Export\`) is the guide's and stays; the readers locate the compared column by the \`Summary\` header alone. Where a table carries \`Shape\`, state one \`Shape\` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a \`### Entities\` table whose every row's \`Kind\` is \`class\` becomes \`### Classes\`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a \`### Classes\` table, added before the H3 sections where none exists (the guide's \`:202-213\` is the shape).
- **The seed**: \`npm run docs\` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); \`npm run docs -- --to guide\` writes every located \`Summary\` cell from its block; \`npm run docs -- --to source\` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every \`docs\` criterion reads a non-zero \`rows read\`. Read the P16 comparator's terms before judging a residual disagreement: a \`{@link}\` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to \`@remarks\`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.
$readme_item
- **The titled pair** (ruling 3): title exactly one \`@example\` — the primary factory's block where one exists (the first \`create*\` the facts block lists), otherwise the block of the exported function the first \`## Patterns\` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (\`grep -n '^#\\+ <title>' guides/$spec\`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with \`npm run docs -- --to source\` and record that run. Every other block stays untitled.
- **The gate cases** in \`tests/guides.test.ts\`, in this file's own header and helpers (the readers come from \`@orkestrel/guide\`; import \`findDrift\` beside the existing readers): the equality case inside the manifest loop's \`describe(entry.concept)\` block collecting \`\${entry.spec} \${drift.key}: guide \${left} source \${right}\` lines with \`absent\` for an undefined side; the pin at file scope in scaffold's inline form (\`fence.title !== undefined && titled.has(fence.title)\`, no local predicate) with the both-sides failure line \`\${GUIDE_SPEC} pairs: guide [...] source [...]\`; the README case with two \`not.toBeUndefined()\` guards before \`toBe\`; \`README.md\` added to \`ROOT_FILES\`; a \`GUIDE_SPEC\` constant for the spec path used by the pin and the README case. Name each test for what it proves.
$probe_item
- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every \`Summary\` cell against its declaration's description paragraph, the titled fence against the \`@example\` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first \`docs\` worklist on this baseline

\`\`\`text
$docs
\`\`\`

$facts

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in \`tests/setupPolicy.ts\` reads \`guides/$spec\` and \`README.md\` against the substitution table.
- Format and lint scoped to your owned paths: \`npx oxfmt --write <paths>\` after edits and after each seed write; \`npx oxfmt --check <paths>\` and \`npx oxlint --config .oxlintrc.json --deny-warnings <paths>\` as gates. \`npm run test:guides\` after the README edit, because a suite reading the README is the objective lane's M9.
- \`package.json\` keeps \`$range\` (the registry serves no \`0.0.18\` yet); do not touch it or the lockfile.

## Scope

Owned: \`guides/$spec\`, \`README.md\`, the doc blocks under \`src/**\` (description paragraphs, \`@remarks\`, and \`@example\` titles and bodies only — no code token moves), \`tests/guides.test.ts\`. Off-limits: everything else, including every vendored file, \`tests/setup*.ts\`, \`tests/src/**\`, \`package.json\`, \`package-lock.json\`, \`guides/README.md\`, \`src/**\` code outside doc blocks, and every other guide under \`guides/\` unless the manifest's \`## By concept\` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run \`npm run test:guides\` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's \`undefined\`).
2. Every table heads \`Summary\` beside only \`Kind\`, \`Shape\`, \`Signature\`, \`Value\`, \`Returns\`; \`### Classes\` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then \`npm run docs -- --to guide\` and the scoped format; the report names each row whose literal stayed in \`Shape\` and each block rewritten by hand.
4. The titled pair lands through \`--to source\`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. \`npm run docs\` exits 0 at a non-zero \`rows read\` and \`disagreements found: 0\`; \`npm run docs -- --to guide\` and \`-- --to source\` each read \`written: 0\`.
7. \`npx oxfmt --check\` and the scoped \`oxlint\` over the owned paths, \`npm run check\`, \`npm run test:guides\` (the three cases now green), \`npm run test:policy\` exit 0; \`npm run test:src:core\` (or the package's narrowest unit script) as an observation.
8. \`git status --short\` lists owned files only.

## Output

\`/home/user/scaffold/tmp/units/d7n-$n-converge-report.md\`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside \`tests/guides.test.ts\` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
EOF
echo "$OUT"; wc -l "$OUT"
