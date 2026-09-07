#!/usr/bin/env bash
# facts.sh <pkg>: the live per-package facts block every P.1 and P.2 brief embeds. Read-only.
set -u
n=$1; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
P20=/home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/p20/p20-fleet-repair-lint.log.txt
cd "$d" || exit 9
spec=$(grep -o '\[`[a-z]*\.md`\]' guides/README.md | head -1 | tr -d '[]`')
[ -z "$spec" ] && spec=$n.md
G=guides/$spec
echo "## Facts for $n (taken $(date -u +%Y-%m-%dT%H:%MZ) by facts.sh)"
echo
echo "- Checkout \`$d\`, branch \`$(git branch --show-current)\`, tip \`$(git rev-parse --short HEAD)\`, status: $( [ -z "$(git status --short)" ] && echo clean || git status --short | tr '\n' ' ')"
echo "- \`package.json\`: version \`$(node -p "require('./package.json').version")\`; \`@orkestrel/guide\` range \`$(node -p "require('./package.json').devDependencies['@orkestrel/guide']")\`; \`@orkestrel/contract\` declared: $(node -p "const p=require('./package.json'); (p.dependencies||{})['@orkestrel/contract']||(p.devDependencies||{})['@orkestrel/contract']||'no'")"
echo "- Installed \`@orkestrel/guide\`: \`$(node -p "require('$d/node_modules/@orkestrel/guide/package.json').version")\` ($(grep -c findDrift node_modules/@orkestrel/guide/dist/src/core/index.d.ts 2>/dev/null) \`findDrift\` mentions in its index declaration)"
echo "- P20 voice sites after \`repair\`: $(grep "^$n |" $P20 | cut -d'|' -f2- | sed 's/^ //')"
echo "- Manifest rows (\`guides/README.md\`, \`grep -n '^| '\`):"
grep -n '^| ' guides/README.md | sed 's/^/    /'
echo "- Guide \`$G\`: $(wc -l < $G) lines. Headings:"
grep -n '^#' $G | sed 's/^/    /'
echo "- Table headers in \`$G\` (a header row is the row before a \`| ---\` row):"
awk -v g="$G" 'prev!="" && /^\| *-+/ {print "    " NR-1 ": " prev} {prev=$0}' $G
echo "- Rows of any \`### Entities\` table (the Kind cell):"
awk '/^### Entities/{f=1;next} /^###|^## /{f=0} f && /^\| `/{split($0,a,"|"); gsub(/^ +| +$/,"",a[3]); print "    " NR ": " a[2] "| " a[3]}' $G | head -20
echo "- H1 blockquote (\`$G\`):"
awk 'NR>1 && /^>/{print "    " NR ": " $0} NR>1 && !/^>/ && !/^$/ && !/^# /{exit}' $G
echo "- Opening prose after the blockquote (first two lines):"
awk 'NR>1 && /^>/{s=1;next} s && /^$/{next} s && !/^>/{print "    " NR ": " $0; c++; if(c==2) exit}' $G
echo "- README (\`README.md\`) first lines:"
sed -n '1,12p' README.md | sed 's/^/    /'
echo "- \`## Patterns\` fences, each with its nearest preceding heading:"
awk -v g="$G" '/^#/{h=$0} /^```/{if(!in_f){in_f=1; print "    " NR ": fence under \"" h "\""} else in_f=0}' $G | awk -F'"' '{print}' | head -40
echo "- Exported factories and classes (\`grep -n 'export function create\|export class' src/**/*.ts\`):"
grep -rn 'export function create\|export class \|export async function create' src --include=*.ts | sed 's/^/    /' | head -20
echo "- \`@example\` blocks per file and any already-titled block (\`@example \\S\`):"
grep -rc '@example' src --include=*.ts | grep -v ':0$' | sed 's/^/    /'
grep -rn '@example [^ ]' src --include=*.ts | sed 's/^/    titled: /' | head
echo "- Drop-in sites (\`tests/guides.test.ts\`):"
grep -n 'findMissing(\|findUnexampled(\|source\.methods(\|source\.examples(\|guide\.methods()\|from .@orkestrel/guide.\|findDrift\|tagline()\|ROOT_FILES\|GUIDE_SPEC' tests/guides.test.ts | sed 's/^/    /'
echo "- \`## Tests\` paragraph naming checks: $(grep -n '^## Tests' $G | head -1) — $(awk '/^## Tests/{f=1;next} /^## /{f=0} f' $G | grep -c 'SQ\|MQ\|EQ\|RQ\|check') lines naming a check or a code"
