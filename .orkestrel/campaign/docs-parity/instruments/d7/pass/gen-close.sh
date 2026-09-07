#!/usr/bin/env bash
# gen-close.sh <pkg>: writes /home/user/scaffold/tmp/units/d7n-<pkg>-close-brief.md — the closing sweep's per-package unit
# (Ruling 15's Shape idiom, the `#`-link re-convergence, the drop-in restored to the pilot's text) from live facts. Read-only.
set -u
n=$1; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
OUT=/home/user/scaffold/tmp/units/d7n-$n-close-brief.md
export PATH=/opt/npm11/bin:$PATH
cd "$d" || exit 9
spec=$(grep -o '\[`[a-z]*\.md`\]' guides/README.md | head -1 | tr -d '[]`'); G=guides/$spec
tip=$(git rev-parse --short HEAD); status=$(git status --short | wc -l)
installed=$(node -p "require('./node_modules/@orkestrel/guide/package.json').version" 2>/dev/null)
sha=$(sha256sum node_modules/@orkestrel/guide/dist/src/core/index.js 2>/dev/null | cut -c1-12)
docs=$(timeout 180 npm run docs 2>&1 | grep -E 'rows read|guides/|pitch' | tail -12; echo "exit ${PIPESTATUS[0]}")
headers=$(grep -n '^| \(API\|Type\|Method\|Constant\|Name\) ' "$G" | sed 's/ *|/ |/g')
sentences=$(grep -n 'A `Shape` cell holds' "$G")
noshape=$(awk -v G="$G" 'BEGIN{h=""} /^\| (API|Type) /{h=$0; hasShape=(h ~ /Shape/)} /^\| `[A-Za-z_]+`[^|]*\| *(interface|type) *\|/{ if(!hasShape) print NR": "$0 }' "$G" | cut -c1-140)
mixed=$(grep -n '^| `[A-Za-z_]*`[^|]*| interface *| `{[^`]*}` *|' "$G" | grep -v ' plus ' | cut -c1-140)
typed=$(grep -n '^| `[A-Za-z_]*`[^|]*| interface *| `{[^`]*:[^`]*}' "$G" | cut -c1-140)
links=$(grep -rn '{@link [A-Za-z]*#\|{@link #' src --include=*.ts | cut -c1-140)
pilot=/home/user/fleet/abort/tests/guides.test.ts
dropin=$(diff <(sed -n '/^describe(/,$p' "$pilot") <(sed -n '/^describe(/,$p' tests/guides.test.ts) | head -60)
budget=$(grep -n '30_000\|findDrift(' tests/guides.test.ts)
cat > "$OUT" <<EOF
# Brief — \`d7n-$n-close\` (the closing sweep: Ruling 15's \`Shape\` idiom, the link re-convergence, the drop-in's canon)

## Role and engine

\`builder\` on Sonnet: a fully specified unit. Sole writer in \`/home/user/fleet/$n\` from the committed tip \`$tip\` (status lines: $status; the final guide head start \`$installed\` installed \`--no-save\`, \`dist/src/core/index.js\` sha256 \`$sha…\`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under \`tmp/d7n-$n-close/\` inside this checkout.

## Read first

\`/home/user/scaffold/AGENTS.md\` § Writing; \`/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md\` § Ruling 12, § Ruling 13, § Ruling 15, § Ruling 16; the pilot's Types table \`/home/user/fleet/abort/guides/abort.md:58-67\` and \`/home/user/fleet/budget/guides/budget.md:60-68\` (a \`plus\` row); the pilot's suite \`$pilot\` whole; \`src/**/types.ts\` for every interface and alias the items name.

## Items

1. **The \`Shape\` idiom (Ruling 15).** Every \`## Surface\` table that carries an \`interface\` or \`type\` row heads \`Shape\` between \`Kind\` and \`Summary\`, under one convention sentence — exactly: "A \`Shape\` cell holds an interface's data members as bare names in braces, \`?\` marking an optional member and \`plus\` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as \`\\|\`." — placed between the section heading and the table (a guard table or a constants table keeps its own second sentence). Each interface row's cell: data members as bare names in braces, \`?\` on an optional one, then \`plus\` and its call-signature members by name (\`{ id, signal, aborted } plus abort\`); a member's type never appears. Each type alias's cell: its own literal, \`\\|\` between union arms. Read every member from the declaration in \`types.ts\`; a symbol-keyed member is written as \`[Symbol.dispose]\`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with \`…\`, or holds prose. Delete a guide sentence that only lists members a cell now holds ("Its readonly data members are …").
   Tables without \`Shape\` that carry interface or type rows (line: row):
$(printf '%s\n' "$noshape" | sed 's/^/   /')
   Interface rows whose braces carry no \`plus\` (read each declaration; where it has call-signature members, move them after \`plus\`):
$(printf '%s\n' "$mixed" | sed 's/^/   /')
   Interface rows spelling a member's type:
$(printf '%s\n' "$typed" | sed 's/^/   /')
   Convention sentences present (rewrite each to the wording above, keeping a guard or constants table's own second sentence):
$(printf '%s\n' "$sentences" | sed 's/^/   /')
2. **Member references.** Doc blocks writing \`{@link Owner#member}\` or \`{@link #member}\`; the final readers compare them as \`Owner#member\` and \`#member\`, so a cell written by the earlier readers may read \`member\` alone. Run \`npm run docs\`; where a row disagrees on such a link, \`npm run docs -- --to guide\` then \`npx oxfmt --write $G\`. Sites:
$(printf '%s\n' "${links:-   (none)}" | sed 's/^/   /')
3. **The drop-in's canon (Ruling 13).** \`tests/guides.test.ts\` from the first \`describe(\` line equals the pilot's file from its first \`describe(\` line, byte for byte, except a package-specific case appended after the pilot's last case (a flagship-fence case, a transcription case) — no per-case budget, \`findDrift\` called inside the \`it\`. The current diff against the pilot from \`describe(\` on (empty means nothing to do):
\`\`\`text
$(printf '%s\n' "${dropin:-(no difference)}")
\`\`\`
   Lines naming a budget or the \`findDrift\` call: $(printf '%s' "$budget" | tr '\n' ';')
4. **Propagation.** \`npx oxfmt --write $G tests/guides.test.ts\`; \`npm run docs\` at \`rows read: 1, disagreements found: 0\`; \`-- --to guide\` and \`-- --to source\` at \`written: 0\`.

## Facts read on this tip

- \`npm run docs\` under the installed head start:
\`\`\`text
$docs
\`\`\`
- Table headers:
$(printf '%s\n' "$headers" | sed 's/^/   /')

## Scope

Owned: \`$G\`, \`tests/guides.test.ts\`, the doc blocks under \`src/**\` only where item 2 needs a cell re-read (no doc block edit is expected). Off-limits: everything else, including \`README.md\`, every vendored file, \`package.json\`, \`package-lock.json\`, \`tests/src/**\`, \`tests/setup*.ts\`, and \`src/**\` code.

## Acceptance criteria, cheapest first

1. \`git status --short\` lists owned files only.
2. \`grep -c 'A \`Shape\` cell holds an interface.s data members as bare names' $G\` equals the count of \`## Surface\` tables carrying an interface or type row; \`grep -n '| interface *| \`{[^\`]*:' $G\` and \`grep -n '…' $G\` print nothing in a \`Shape\` cell.
3. \`diff <(sed -n '/^describe(/,\$p' $pilot) <(sed -n '/^describe(/,\$p' tests/guides.test.ts)\` prints nothing, or only an appended package-specific case.
4. \`npx oxfmt --check $G tests/guides.test.ts\` and \`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts\` exit 0.
5. \`npm run docs\` at zero; both write directions at \`written: 0\`.
6. \`npm run test:guides\` exit 0 (the equality case under the default budget) and \`npm run test:policy\` exit 0; record the summaries.

## Output

\`/home/user/scaffold/tmp/units/d7n-$n-close-report.md\`: per item the hunk, per criterion the command and its last lines, the wall clock. No count in prose. No process diary.

## Deviation contract

Stop on: a \`Shape\` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement \`--to guide\` does not close. Decide ancillary matters and record them.
EOF
echo "$OUT"
