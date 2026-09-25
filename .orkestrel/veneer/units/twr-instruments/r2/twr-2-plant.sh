#!/usr/bin/env bash
# Runs each named plant (tmp/units/twr-2-plant.py) against `npm run test:service`, logging to
# tmp/units/twr-2-plant-<label>.log.txt, and restores the guide and both recipe fixtures
# byte-identically from backups taken before the plant. Every command is echoed before it runs.
# Usage: bash tmp/units/twr-2-plant.sh <label-suffix> <plant>...
cd /home/user/veneer-twr || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
suffix="$1"
shift
backup=tmp/units/twr-2-plant-backup
mkdir -p "$backup"
cp guides/veneer.md "$backup/guide.md"
cp tests/fixtures/tailwind/consumer-preflight.css "$backup/consumer-preflight.css"
cp tests/fixtures/tailwind/consumer.css "$backup/consumer.css"
git status --short > "$backup/status-before.txt"
git diff --stat > "$backup/stat-before.txt"
for name in "$@"; do
	log="tmp/units/twr-2-plant-$name$suffix.log.txt"
	{
		echo "plant=$name"
		echo "+ python3 tmp/units/twr-2-plant.py $name"
		python3 tmp/units/twr-2-plant.py "$name"
		echo "+ diff -u (planted files against their backups)"
		diff -u "$backup/guide.md" guides/veneer.md
		diff -u "$backup/consumer-preflight.css" tests/fixtures/tailwind/consumer-preflight.css
		diff -u "$backup/consumer.css" tests/fixtures/tailwind/consumer.css
		echo "+ npm run test:service"
		started=$(date +%s)
		npm run test:service
		echo "exit=$?"
		echo "elapsed=$(( $(date +%s) - started ))s"
		echo "+ cat /proc/loadavg"
		cat /proc/loadavg
	} > "$log" 2>&1
	cp "$backup/guide.md" guides/veneer.md
	cp "$backup/consumer-preflight.css" tests/fixtures/tailwind/consumer-preflight.css
	cp "$backup/consumer.css" tests/fixtures/tailwind/consumer.css
	{
		echo "+ restore"
		cmp "$backup/guide.md" guides/veneer.md && echo "restored guide byte-identical"
		cmp "$backup/consumer-preflight.css" tests/fixtures/tailwind/consumer-preflight.css && echo "restored preflight fixture byte-identical"
		cmp "$backup/consumer.css" tests/fixtures/tailwind/consumer.css && echo "restored consumer fixture byte-identical"
		git diff --stat > "$backup/stat-after.txt"
		cmp "$backup/stat-before.txt" "$backup/stat-after.txt" && echo "git diff --stat unchanged from before the plant"
		git status --short > "$backup/status-after.txt"
		cmp "$backup/status-before.txt" "$backup/status-after.txt" && echo "git status unchanged from before the plant"
	} >> "$log" 2>&1
done
