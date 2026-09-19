#!/usr/bin/env bash
# Claim 13 of the T audit: re-run the writers' mutation passes and read the counts bare.
# Each script backs up, applies one pass, the suite runs, and the script restores from the backup.
set -u
T="C:/Users/mikes/WebstormProjects/test"
R="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
mkdir -p "$out"
cd "$T" || exit 1
totals() { sed 's/\x1b\[[0-9;]*m//g' "$1" | grep -E "Tests  " | tail -1; }
run() {
	local label="$1"; shift
	"$@" > "$out/mut-$label.log.txt" 2>&1
	echo "$label: exit=$? $(totals "$out/mut-$label.log.txt")"
}
echo "baseline: $(git log --oneline -1)"
# T1 pass 1
python "$R/t1-instruments/mutate.py" backup && python "$R/t1-instruments/mutate.py" apply && echo "t1-pass1 applied"
run t1p1-core npm run test:src:core
run t1p1-browser npm run test:src:browser
python "$R/t1-instruments/mutate.py" restore && echo "t1-pass1 restored: $(git status --short | grep -v '^?? tmp/' | wc -l) tracked changes"
# T1 pass 2
python "$R/t1-instruments/mutate2.py" backup && python "$R/t1-instruments/mutate2.py" apply && echo "t1-pass2 applied"
run t1p2-core npm run test:src:core
run t1p2-browser npm run test:src:browser
python "$R/t1-instruments/mutate2.py" restore && echo "t1-pass2 restored: $(git status --short | grep -v '^?? tmp/' | wc -l) tracked changes"
# T2 passes
python "$R/t2-instruments/mutate.py" backup
for pass in apply1 apply2 apply3; do
	python "$R/t2-instruments/mutate.py" "$pass" && echo "t2-$pass applied"
	run "t2-$pass" npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/factories.test.ts
	python "$R/t2-instruments/mutate.py" restore && echo "t2-$pass restored"
done
echo "final: $(git status --short | grep -v '^?? tmp/' | wc -l) tracked changes"
