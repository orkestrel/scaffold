#!/usr/bin/env bash
# Runs the order-line plant against the baseline proofs: puts the 21c821a copy of consumer.test.ts in
# place, deletes the preflight fence's order line, runs the service project, and restores both files
# byte-identically from backups under tmp/units/.
cd /home/user/veneer-twr || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log=tmp/units/twr-plant-order-baseline.log.txt
cp guides/veneer.md tmp/units/twr-plant-backup-guide.md
cp tests/service/tailwind/consumer.test.ts tmp/units/twr-plant-backup-consumer.ts
git diff --stat > tmp/units/twr-plant-stat-before.txt
{
	echo "plant=order against the 21c821a proofs"
	git show 21c821a:tests/service/tailwind/consumer.test.ts > tests/service/tailwind/consumer.test.ts
	python3 tmp/units/twr-plant.py order
	diff -u tmp/units/twr-plant-backup-guide.md guides/veneer.md
	echo "command=npm run test:service"
	npm run test:service
	echo "exit=$?"
} > "$log" 2>&1
cp tmp/units/twr-plant-backup-guide.md guides/veneer.md
cp tmp/units/twr-plant-backup-consumer.ts tests/service/tailwind/consumer.test.ts
{
	cmp tmp/units/twr-plant-backup-guide.md guides/veneer.md && echo "restored guide byte-identical"
	cmp tmp/units/twr-plant-backup-consumer.ts tests/service/tailwind/consumer.test.ts && echo "restored consumer.test.ts byte-identical"
	git diff --stat > tmp/units/twr-plant-stat-after.txt
	cmp tmp/units/twr-plant-stat-before.txt tmp/units/twr-plant-stat-after.txt && echo "git diff --stat unchanged from before the plant"
	echo "loadavg=$(cat /proc/loadavg)"
} >> "$log" 2>&1
