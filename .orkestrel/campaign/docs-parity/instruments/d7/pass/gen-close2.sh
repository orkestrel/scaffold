#!/usr/bin/env bash
# gen-close2.sh <pkg> (successor of gen-close.sh: the drop-in diff scoped to the shared region, guard and constants tables under
# Ruling 20, the convention sentences checked as paragraphs, empty lists written as none, a NEEDED verdict on stdout):
# writes /home/user/scaffold/tmp/units/d7n-<pkg>-close-brief.md from live facts. Read-only.
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
noshape=$(awk 'BEGIN{h=""} /^\| (API|Type|Name) /{h=$0; hasShape=(h ~ /Shape/)} /^\| `[A-Za-z_]+`[^|]*\| *(interface|type) *\|/{ if(!hasShape) print NR": "$0 }' "$G" | cut -c1-140)
mixed=$(grep -n '^| `[A-Za-z_]*`[^|]*| interface *| `{[^`]*}` *|' "$G" | grep -v ' plus ' | cut -c1-140)
typed=$(grep -n '^| `[A-Za-z_]*`[^|]*| interface *| `{[^`]*:[^`]*}' "$G" | cut -c1-140)
links=$(grep -rn '{@link [A-Za-z]*#\|{@link #' src --include=*.ts | cut -c1-140)
# Ruling 20: a dedicated guard table and a constants table head Shape; the sentences are paragraphs.
tables=$(python3 - "$G" <<'PY'
import sys,re
lines=open(sys.argv[1]).read().split('\n')
IFACE="A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`."
CONST="A `Shape` cell holds the constant's declared type."
GUARD="In a guard table a `Shape` cell holds the type the guard narrows to."
out=[]
# paragraphs carrying the phrase
i=0
while i<len(lines):
    if 'A `Shape` cell holds' in lines[i] or 'In a guard table a `Shape`' in lines[i]:
        j=i; para=[]
        while j<len(lines) and lines[j].strip(): para.append(lines[j].strip()); j+=1
        text=' '.join(para)
        sents=[s.strip() for s in re.split(r'(?<=\.)\s+(?=[A-Z])', text)]
        for s in sents:
            if 'Shape' in s and s not in (IFACE,CONST,GUARD): out.append(f"{i+1}: SENTENCE OFF CANON: {s[:160]}")
        i=j
    else: i+=1
# tables: heading -> header row -> rows
heading=None
for k,l in enumerate(lines):
    if l.startswith('#'): heading=l.strip('# ').strip(); continue
    if re.match(r'^\| (API|Type|Name) ', l):
        has='Shape' in l
        rows=[]; m=k+2
        while m<len(lines) and lines[m].startswith('|'): rows.append(lines[m]); m+=1
        kinds=[re.split(r'\s*\|\s*', r)[2] if len(re.split(r'\s*\|\s*', r))>2 else '' for r in rows]
        if heading=='Guards' or (rows and all(re.search(r'\| *function *\|', r) and re.search(r'`is[A-Z]', r) for r in rows)):
            if not has: out.append(f"{k+1}: GUARD TABLE WITHOUT Shape under '{heading}' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)")
        if heading=='Constants' or (rows and all(re.search(r'\| *const *\|', r) for r in rows)):
            if not has: out.append(f"{k+1}: CONSTANTS TABLE WITHOUT Shape under '{heading}' (Ruling 18: heads Shape with the declared type, under the constants sentence)")
            # the sentence above it
            up=' '.join(x.strip() for x in lines[max(0,k-8):k])
            if IFACE in up: out.append(f"{k+1}: CONSTANTS TABLE carries the interface sentence (Ruling 20: the constants sentence alone)")
print('\n'.join(out))
PY
)
fences=$(awk '/^#/{h=NR": "$0; blank=0; next} /^[[:space:]]*$/{if(h!="")blank=1; next} /^```/{ if(h!="" && blank==1) print h" -> fence at "NR; h=""; next } {h=""}' "$G" | cut -c1-140)
extended=$(grep -rn '^export interface [A-Za-z]* extends' src --include=types.ts | cut -c1-140)
pilot=/home/user/fleet/abort/tests/guides.test.ts
region() { awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' "$1"; }
dropin=$(diff <(region "$pilot") <(region tests/guides.test.ts) | head -80)
header=$(diff <(sed -n 1,3p "$pilot") <(sed -n 1,3p tests/guides.test.ts); grep -c 'the assertion that follows it fails when a name here stops being stranded' tests/guides.test.ts | sed 's/^/INTERNAL sentence present: /')
budget=$(grep -n '30_000\|findDrift(' tests/guides.test.ts)
needed=no
[ -n "$noshape$mixed$typed$links$tables$fences$extended" ] && needed=yes
[ -n "$dropin" ] && needed=yes
echo "$docs" | grep -q 'disagreements found: 0' || needed=yes
cat > "$OUT" <<EOF
# Brief — \`d7n-$n-close\` (the closing sweep: Rulings 15, 18, and 20, the link re-convergence, the drop-in's canon)

## Role and engine

\`builder\` on Sonnet: a fully specified unit. Sole writer in \`/home/user/fleet/$n\` from the committed tip \`$tip\` (status lines: $status; the final guide head start \`$installed\` installed \`--no-save\`, \`dist/src/core/index.js\` sha256 \`$sha…\`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under \`tmp/d7n-$n-close/\` inside this checkout.

## Read first

\`/home/user/scaffold/AGENTS.md\` § Writing; \`/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md\` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 16, § Ruling 18, § Ruling 20, § Ruling 21; the pilot's Types table \`/home/user/fleet/abort/guides/abort.md:58-67\` and \`/home/user/fleet/budget/guides/budget.md:60-68\` (a \`plus\` row); the pilot's suite \`$pilot\` whole; \`src/**/types.ts\` and \`src/**/constants.ts\` for every declaration the items name.

## Items

1. **The \`Shape\` idiom (Rulings 15, 18, 20).** Every \`## Surface\` table that carries an \`interface\` or \`type\` row heads \`Shape\` between \`Kind\` and \`Summary\`, under one convention sentence — exactly: "A \`Shape\` cell holds an interface's data members as bare names in braces, \`?\` marking an optional member and \`plus\` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as \`\\|\`." — placed between that table's heading and the table, once per table (Ruling 20). A dedicated guard table heads \`Shape\` with the type each guard narrows to, under the sentence "In a guard table a \`Shape\` cell holds the type the guard narrows to." A constants table heads \`Shape\` with the constant's declared type under the sentence "A \`Shape\` cell holds the constant's declared type." alone. Each interface row's cell: data members as bare names in braces, \`?\` on an optional one, then \`plus\` and its call-signature members by name (\`{ id, signal, aborted } plus abort\`); a member's type never appears. Each type alias's cell: its own literal, \`\\|\` between union arms; an alias over an object literal takes bare member names (Ruling 19). Read every member from the declaration; a symbol-keyed member is written as \`[Symbol.dispose]\`. Rewrite every row that spells a member's type, mixes methods into the braces, elides with \`…\`, or holds prose. Delete a guide sentence that only lists members a cell now holds.
   Tables without \`Shape\` that carry interface or type rows (line: row):
$(printf '%s\n' "${noshape:-(none)}" | sed 's/^/   /')
   Interface rows whose braces carry no \`plus\` (read each declaration; where it has call-signature members, move them after \`plus\`):
$(printf '%s\n' "${mixed:-(none)}" | sed 's/^/   /')
   Interface rows spelling a member's type:
$(printf '%s\n' "${typed:-(none)}" | sed 's/^/   /')
   Guard and constants tables, and convention sentences off the canon (Ruling 20):
$(printf '%s\n' "${tables:-(none)}" | sed 's/^/   /')
   Extended interfaces (Ruling 21: the cell names the parent before \`plus\` and the added members after; the table's sentence gains "An extended interface's name comes before \`plus\`, with the members it adds after."):
$(printf '%s\n' "${extended:-(none)}" | sed 's/^/   /')
2. **Member references.** Doc blocks writing \`{@link Owner#member}\` or \`{@link #member}\`; the final readers compare them as \`Owner#member\` and \`#member\`, so a cell written by the earlier readers may read \`member\` alone. Run \`npm run docs\`; where a row disagrees on such a link, \`npm run docs -- --to guide\` then \`npx oxfmt --write $G\`. Sites:
$(printf '%s\n' "${links:-(none)}" | sed 's/^/   /')
3. **The drop-in's canon (Rulings 13 and 20).** \`tests/guides.test.ts\` from its \`const root = \` line through the manifest loop's closing brace equals the pilot's same region byte for byte — \`new URL('../', import.meta.url)\`, \`/Interface$/\` with no flag, the pilot's comments, no per-case budget, \`findDrift\` called inside the \`it\` — except a package-specific case appended after the pilot's cases (a file-scope case after the pilot's README case and before the manifest loop; a case inside the loop's \`describe\` after the pilot's examples loop). A binding only the package's own case uses moves inside that case; a case name or an assertion that differs from the pilot's takes the pilot's. Line 2 reads the pilot's header line and the \`INTERNAL\` block carries the pilot's sentence. The current diff of that region against the pilot (empty means nothing to do):
\`\`\`text
$(printf '%s\n' "${dropin:-(no difference)}")
\`\`\`
   Header (lines 1 to 3 against the pilot's; the canon of Ruling 21): $(printf '%s' "${header:-equal}" | tr '\n' ';')
   Lines naming a budget or the \`findDrift\` call: $(printf '%s' "$budget" | tr '\n' ';')
4. **Fence lead-ins (Ruling 21).** Every code fence sits under a complete sentence naming what it shows; a fence directly under a heading takes one sentence between them (a titled fence: what the demonstration builds). Fences directly under a heading (heading line -> fence line):
$(printf '%s\n' "${fences:-(none)}" | sed 's/^/   /')
5. **Propagation.** \`npx oxfmt --write $G tests/guides.test.ts\`; \`npm run docs\` at \`rows read: 1, disagreements found: 0\`; \`-- --to guide\` and \`-- --to source\` at \`written: 0\`.

## Facts read on this tip

- \`npm run docs\` under the installed head start:
\`\`\`text
$docs
\`\`\`
- Table headers:
$(printf '%s\n' "$headers" | sed 's/^/   /')

## Scope

Owned: \`$G\`, \`tests/guides.test.ts\`, the doc blocks under \`src/**\` only where item 1 needs a constant's literal named (Ruling 18) or item 2 needs a cell re-read (no code token moves). Off-limits: everything else, including \`README.md\`, every vendored file, \`package.json\`, \`package-lock.json\`, \`tests/src/**\`, \`tests/setup*.ts\`, and \`src/**\` code.

## Acceptance criteria, cheapest first

1. \`git status --short\` lists owned files only.
2. Every table carrying \`Shape\` has its canonical sentence between its heading and the table; \`grep -n '| interface *| \`{[^\`]*:' $G\` and \`grep -n '…' $G\` print nothing in a \`Shape\` cell.
3. The item 3 region diff against the pilot prints nothing, or only an appended package-specific case; line 2 equals the pilot's.
4. \`npx oxfmt --check $G tests/guides.test.ts\` and \`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts\` exit 0.
5. \`npm run docs\` at zero; both write directions at \`written: 0\`.
6. \`npm run test:guides\` exit 0 (the equality case under the default budget) and \`npm run test:policy\` exit 0; record the summaries.

## Output

\`/home/user/scaffold/tmp/units/d7n-$n-close-report.md\`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a \`Shape\` cell Ruling 12 cannot express; the equality case red under the default budget; a gate outside the owned files going red; a disagreement \`--to guide\` does not close. Decide ancillary matters and record them.
EOF
echo "$OUT NEEDED=$needed docs=$(echo "$docs" | head -1)"
