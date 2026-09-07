#!/usr/bin/env bash
# gen-p1.sh <pkg> <role: builder|implementer>: writes /home/user/scaffold/tmp/units/d7n-<pkg>-prep-brief.md from the
# pilot's A.1 shape, the live facts block (facts.sh), the P21 readings, and the head-start log. Read-only over the checkout.
set -u
n=$1; role=$2; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
OUT=/home/user/scaffold/tmp/units/d7n-$n-prep-brief.md
case $role in builder) engine="Sonnet";; implementer) engine="Claude Opus 5";; *) echo "role?"; exit 2;; esac
cd "$d" || exit 9
tip=$(git rev-parse --short HEAD); ver=$(node -p "require('./package.json').version"); next=$(node -p "const v='$ver'.split('.');v[2]=String(Number(v[2])+1);v.join('.')")
facts=$(bash $SCR/facts.sh $n)
p21=$(awk -v n="$n" '$0 ~ "^### "n" \\(" {f=1} f && /^### / && $0 !~ "^### "n" \\(" {f=0} f' $SCR/p21/p21-fleet-readings.log.txt $SCR/p21/p21b-fleet-readings.log.txt 2>/dev/null)
hs=$(cat $SCR/headstart/$n.log.txt 2>/dev/null || echo "(head start not yet installed)")
p20=$(grep "^$n |" /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/p20/p20-fleet-repair-lint.log.txt | cut -d'|' -f2- | sed 's/^ //')
probe_item=""; probe_scope=""
if [ "$n" = probe ]; then
probe_item='5. **The manifest table.** `guides/README.md` lists its concepts under `## By concept` as a list, which `parseManifest` does not read (`npm run docs` reads `rows read: 0`). Replace the list with the `| Concept | Spec | Source | Tests |` table every other package carries (the shape at `/home/user/fleet/abort/guides/README.md:7-9`), one row per listed guide, keeping every link target; leave the directory index as it is.'
probe_scope=', `guides/README.md` (the `## By concept` table only)'
fi
cat > "$OUT" <<EOF
# Brief — P.1 \`d7n-$n-prep\` ($n's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

\`$role\` on $engine: a fully specified unit. Sole writer in \`$d\` (branch \`claude/orkestrel-npm-audit-deps-14ibta\`, tip \`$tip\`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (\`checkout\`, \`restore\`, \`stash\`, \`reset\`, \`clean\`); undo an edit by editing. Read \`/home/user/scaffold/AGENTS.md\`, \`/home/user/scaffold/.claude/rules/writing.md\` (the substitution table), and \`/home/user/scaffold/.claude/rules/tests.md\` before editing.

## Objective

$n's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the \`0.0.18\` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and \`version\` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: \`guides/**\`, \`README.md\`, and every doc block under \`src/**\` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed \`@orkestrel/guide@0.0.18\` (packed at the guide's \`c86f7fd\`) into \`node_modules\` with \`--no-save\`; \`package.json\` still declares the \`^0.0.17\` range and stays so in this unit (the registry serves no \`0.0.18\` yet; the re-pin lands after the release). \`npm ls\` reports that one package \`invalid\` against its range, which is expected. Do not run \`npm install\` or \`npm ci\`. The install log:

\`\`\`text
$hs
\`\`\`

- Scaffold's tip is extracted at \`$SCR/tip/package\`; its CLI is \`node $SCR/tip/package/dist/bin/main.js\`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; \`docs\` prints the converge unit's worklist):

\`\`\`text
$p21
\`\`\`

- The \`0.0.18\` readers return records: \`guide.methods()\` groups carry \`methods: readonly MethodEntry[]\` (each with \`name\`), \`source.methods(name)\` returns \`readonly MethodEntry[]\`, \`source.examples()\` and \`source.examples(name)\` return \`readonly SourceExample[]\` (each with \`name\`). \`findMissing\` and \`findUnexampled\` take names. The accepted adaptation of this same drop-in is at \`/home/user/fleet/abort/tests/guides.test.ts:145-215\` (a sibling package's suite: \`members\` and \`documented\` bound once per \`describe\`, the mapped \`examples\` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (\`policy/no-malformed-summary\`: a doc block's description paragraph opens with a third-person verb ending in \`s\` and does not name the symbol it documents in its first sentence; \`policy/no-banned-term\`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after \`repair\`. P20 read after \`repair\` in a scratch clone: $p20.
- \`npm run format\` after editing; the acceptance gate is \`format:check\`. Run every script with \`npm run\`; \`node\` is v22.
- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under \`tests/\` is swept by the prose sweep in \`tests/setupPolicy.ts\`, so its text and the assertion that reads it move together.

$facts

## Items

1. **\`repair --offline\`.** Run \`node $SCR/tip/package/dist/bin/main.js repair --offline\` in the checkout; record its summary line and \`git status --short\` after (expected: the P21 list exactly — \`.oxlintrc.json\`, \`configs/helpers.ts\`, \`configs/policy.ts\`, \`package.json\` (the \`docs\` script row), \`tests/config.test.ts\`, \`tests/policy.test.ts\`, \`tests/setupPolicy.ts\`, \`tsconfig.json\` (the own-specifier \`paths\` entry), and \`scripts/docs.ts\` untracked).
2. **The drop-in's adaptation** (\`tests/guides.test.ts\`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: \`const members = source.methods(group.interface)\` → \`const members = source.methods(group.interface).map((method) => method.name)\`, and a new \`const documented = group.methods.map((method) => method.name)\` beside it; every \`group.methods\` passed to \`findMissing\` becomes \`documented\`; \`findMissing(source.methods(entity), group.methods)\` → \`findMissing(source.methods(entity).map((method) => method.name), documented)\`; the \`group.methods.length\` assertion stays.
   - in the examples case: \`findUnexampled(names, fences, source.examples())\` → \`findUnexampled(names, fences, source.examples().map((example) => example.name))\`.
   - in the examples loop: bind \`const documented = group.methods.map((method) => method.name)\` once, map the \`examples\` binding's records to names (\`source.examples(group.interface).map((example) => example.name)\` and the concatenation the same way), and pass \`documented\` to \`findUnexampled\`.
   - a \`findMissing\` whose arguments are already strings (the import walk's \`statement.names\` against \`face.surface().map((symbol) => symbol.name)\`, a \`names\` against \`surface\`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run \`npx oxlint --config .oxlintrc.json --deny-warnings .\` and fix every \`policy/no-malformed-summary\` and \`policy/no-banned-term\` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in \`s\` that states what the declaration does (\`Creates\`, \`Returns\`, \`Records\`, \`Checks whether\`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as \`A recorder that …\` becomes \`Records …\`. For a banned term: apply the row of the substitution table in \`.claude/rules/writing.md\` (\`just\`, \`simply\`, \`easy\` deleted or recast; \`via\` → \`through\`; \`e.g.\` → \`for example\`; \`etc.\` bounded; \`utilize\` → \`use\`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run \`npm run test:policy\`: where its \`prose\` rule names a line in \`guides/**\` or \`README.md\` (P21's reading under \`-- test:policy\` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** \`package.json\` \`"version": "$ver"\` → \`"version": "$next"\`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit \`package-lock.json\`.
$probe_item

## Scope

Owned: the paths \`repair --offline\` writes, \`tests/guides.test.ts\` (the sites in item 2), every file \`oxlint\` names in item 3 under \`tests/**\` and, for a doc block or a comment only, under \`src/**\`, the lines the prose sweep names in \`guides/**\` and \`README.md\`, \`package.json\` (\`version\`)$probe_scope. Off-limits: everything else, including \`guides/**\`${probe_scope:+ (the \`## By concept\` table excepted)}, \`README.md\`, code under \`src/**\` outside a comment, \`package-lock.json\`, \`node_modules\`.

## Acceptance criteria, cheapest first

1. \`git status --short\` lists the P21 repair list plus \`tests/guides.test.ts\`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. \`npm run format:check\`, \`npx oxlint --config .oxlintrc.json --deny-warnings .\`, and \`npm run check\` exit 0.
3. \`npm run test:guides\` exits 0 (record its \`Tests\` summary line; P21's failures were the record shapes alone); \`npm run test:policy\` and \`npm run test:config\` exit 0.
4. \`npm run docs\` reads a non-zero \`rows read\` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

\`/home/user/scaffold/tmp/units/d7n-$n-prep-report.md\`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the \`docs\` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if \`repair\` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if \`test:policy\` reds on a file outside your scope, or if a gate other than \`docs\` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
EOF
echo "$OUT"; wc -l "$OUT"
