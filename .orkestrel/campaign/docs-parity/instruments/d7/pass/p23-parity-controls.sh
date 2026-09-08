#!/usr/bin/env bash
# P23: per converged package, in a scratch clone of its tip with the checkout's node_modules linked (the head start
# inside): the baseline gate, the census (census.mjs), then planted controls — each must redden the gate, and the
# log records the exact reading. A control that leaves the gate green is a false positive of the gate. Backups by cp;
# no discard-class git command. Usage: p23-parity-controls.sh <pkg>...
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
export PATH=/opt/npm11/bin:$PATH
docs() { timeout 120 npm run docs 2>&1 | grep -E 'rows read|guides/|pitch' | tail -"${1:-4}"; echo "   docs exit ${PIPESTATUS[0]}"; }
guides() { timeout 300 npx vitest run --config vite.config.ts --no-cache --project guides --reporter=default 2>&1 | grep -E '^ *(×|FAIL|AssertionError)|Tests  ' | sed 's/^ *//' | sort -u | head -8; echo "   test:guides exit ${PIPESTATUS[0]}"; }
for n in "$@"; do
  d=/home/user/fleet/$n; C=$SCR/p23/clone-$n; LOG=$SCR/p23/$n.log.txt
  rm -rf "$C"; git clone -q "$d" "$C" || { echo "$n: clone failed" > "$LOG"; continue; }
  ln -sfn "$d/node_modules" "$C/node_modules"
  (
    cd "$C" || exit 9
    spec=$(grep -o '\[`[a-z]*\.md`\]' guides/README.md | head -1 | tr -d '[]`'); G=guides/$spec
    echo "### $n at $(git rev-parse --short HEAD), guide $G, head start $(node -p "require('./node_modules/@orkestrel/guide/package.json').version")"
    echo "-- baseline"; docs 2; guides
    echo "-- census"; node "$SCR/p23/census.mjs" "$C" > "$SCR/p23/$n.census.json"; node -e "
      const c=require('$SCR/p23/$n.census.json'); for (const g of c.guides) { console.log('   '+g.spec+' surface '+JSON.stringify(g.surface.counts)+' methods '+JSON.stringify(g.methods.counts)+' groups '+g.methods.groups+' findDrift '+g.findDrift);
      console.log('   unmatched/undocumented/bothAbsent: '+JSON.stringify([g.surface.unmatched,g.surface.undocumentedInSource,g.surface.bothAbsent,g.methods.bothAbsent,g.methods.unmatched]));
      for (const o of g.owners) console.log('   owner '+o.keyword+' '+o.name+' methods '+o.methods+' grouped '+o.grouped+' undescribed '+JSON.stringify(o.undescribed));
      console.log('   examples titledFences '+g.examples.titledFences.length+' titledExamples '+JSON.stringify(g.examples.titledExamples)+' pairs '+JSON.stringify(g.examples.pairs)) }"
    # locate control sites
    sumline=$(awk -v s=0 '/^\| *[A-Za-z]+ *\|.*\| *Summary *\|/{s=1;next} s && /^\| *-+/{next} s && /^\| `/{print NR; exit}' "$G")
    methline=$(awk '/^## Methods/{m=1} m && /^\| *Method *\|.*Summary/{s=1;next} s && /^\| *-+/{next} s && /^\| `/{print NR; exit}' "$G")
    titlefile=$(grep -rln '@example [^ ]' src | head -1); titleline=$(grep -n '@example [^ ]' "$titlefile" | head -1 | cut -d: -f1)
    blockfile=$(grep -rl 'export function\|export class' src/core/*.ts src/**/*.ts 2>/dev/null | head -1)
    echo "-- sites: surface row $G:$sumline; methods row $G:${methline:-none}; title $titlefile:$titleline"
    cp "$G" "$G.bak"; cp README.md README.md.bak; cp "$titlefile" "$titlefile.bak"
    echo "-- control A: one Surface Summary cell altered ($G:$sumline)"
    awk -v L="$sumline" 'NR==L{sub(/\| *$/," Control. |")}1' "$G.bak" > "$G"; docs 3; guides; cp "$G.bak" "$G"
    if [ -n "$methline" ]; then echo "-- control B: one Methods Summary cell altered ($G:$methline)"; awk -v L="$methline" 'NR==L{sub(/\| *$/," Control. |")}1' "$G.bak" > "$G"; docs 3; guides; cp "$G.bak" "$G"; else echo "-- control B: no Methods table in $G (skipped)"; fi
    echo "-- control C: one doc-block description altered in source (the titled block's owner)"
    descline=$(awk -v L="$titleline" 'NR<L && /^\/\*\*/{s=NR} NR<L && s && /^ \* [A-Z]/{d=NR} END{print d}' "$titlefile"); sed "${descline}s/^ \* \([A-Za-z]*\)/ * Control \1/" "$titlefile.bak" > "$titlefile"; sed -n "${descline}p" "$titlefile" | sed 's/^/   edited: /'; docs 3; guides; cp "$titlefile.bak" "$titlefile"
    echo "-- control D: the @example title removed ($titlefile:$titleline)"
    sed "${titleline}s/@example .*/@example/" "$titlefile.bak" > "$titlefile"; docs 3; guides; cp "$titlefile.bak" "$titlefile"
    echo "-- control E: the titled example body altered"
    sed "$((titleline+2))s/^\( \* \)\(.*\)$/\1\2 \/\/ control/" "$titlefile.bak" > "$titlefile"; docs 3; guides; cp "$titlefile.bak" "$titlefile"
    echo "-- control F: the README pitch altered"
    awk 'NR>1 && /^>/ && !done {sub(/^> /,"> Control: "); done=1}1' README.md.bak > README.md; docs 3; guides; cp README.md.bak README.md
    echo "-- control G: one Summary header renamed to Behavior"
    awk '/\| *Summary *\|/ && !done {sub(/Summary/,"Behavior"); done=1}1' "$G.bak" > "$G"; docs 4; guides; cp "$G.bak" "$G"
    rm -f "$G.bak" README.md.bak "$titlefile.bak"
    echo "-- restored"; docs 1; git status --short | sed 's/^/   /'
  ) > "$LOG" 2>&1
  rm -rf "$C"
done
echo "P23 DONE"
