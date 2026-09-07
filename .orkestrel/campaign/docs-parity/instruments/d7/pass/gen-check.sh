#!/usr/bin/env bash
# gen-check.sh <pkg> <unit> [<unit2> ...]: writes /home/user/scaffold/tmp/units/d7n-<pkg>-check-brief.md — a checker's closure brief over the named
# unit(s) (their retained brief, report, diff, status under the campaign folder). Read-only.
set -u
n=$1; shift; units="$*"
OUT=/home/user/scaffold/tmp/units/d7n-$n-check-brief.md
tip=$(git -C /home/user/fleet/$n rev-parse --short HEAD)
ev=""; for u in $units; do ev="$ev \`$u-brief.md\`, \`$u-report.md\`, \`$u.diff.txt\`, \`$u.status.txt\`;"; done
cat > "$OUT" <<B
# Closure brief — $n: the checker over $(echo $units | sed 's/ /, /g')

## Lane

One lane, clean context: a **checker** (\`checker\`, Sonnet) over $n's unit(s) named in the title. Read \`/home/user/scaffold/AGENTS.md\` § Writing and \`/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md\` § Rulings 12 to 22 first.

## Evidence (under \`/home/user/scaffold/.orkestrel/campaign/docs-parity/\`)

-$ev \`/home/user/fleet/$n\` at its tip \`$tip\`; the pilot \`/home/user/fleet/abort/tests/guides.test.ts\` and \`/home/user/fleet/abort/guides/abort.md\`.

## Claims (rule each with evidence)

1. Every item each named brief lists landed in its unit's diff as the brief states it, and nothing else changed (scope honesty against each status file; a brief's owned-files list is the bound).
2. Each report's citations match the tree the unit left; each report states no count in prose (a number quoted with the run that produced it is a measurement, not a count); a decision the brief left to the unit is recorded in the report.
3. The tree carries the rulings the brief invokes where the brief names them: every table carrying \`Shape\` sits under its canonical sentence (Rulings 15, 20, 21); an extended interface's cell names its parent before \`plus\` (Ruling 21); a constants table heads \`Shape\` with the declared type and a literal a reader needs is in the description (Ruling 18); \`tests/guides.test.ts\` lines 1 to 3 equal the pilot's and the region from \`const root = \` through the manifest loop's closing brace equals the pilot's outside appended package-specific cases (Rulings 13, 20, 21); no fence sits directly under a heading (Ruling 21); no all-caps emphasis, no count, no banned pointer remains in the owned prose.

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal \`VERDICT: PASS\` or \`VERDICT: FAIL <claims>\`; open with \`Lane held: checker $n\`. No process diary. Perform the assignment directly and spawn nothing; you run no command and edit nothing.
B
echo "$OUT"
