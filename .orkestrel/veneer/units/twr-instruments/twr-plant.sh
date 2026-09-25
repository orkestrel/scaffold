#!/usr/bin/env bash
# Runs each plant against the service project, logging to tmp/units/twr-plant-<name>.log.txt, and
# restores the guide and the fixture byte-identically from backups under tmp/units/.
cd /home/user/veneer-twr || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cp guides/veneer.md tmp/units/twr-plant-backup-guide.md
cp tests/fixtures/tailwind/consumer-preflight.css tmp/units/twr-plant-backup-fixture.css
git diff --stat > tmp/units/twr-plant-stat-before.txt
for name in "$@"; do
	log="tmp/units/twr-plant-$name.log.txt"
	{
		echo "plant=$name"
		python3 tmp/units/twr-plant.py "$name"
		diff -u tmp/units/twr-plant-backup-guide.md guides/veneer.md
		diff -u tmp/units/twr-plant-backup-fixture.css tests/fixtures/tailwind/consumer-preflight.css
		echo "command=npm run test:service"
		npm run test:service
		echo "exit=$?"
	} > "$log" 2>&1
	cp tmp/units/twr-plant-backup-guide.md guides/veneer.md
	cp tmp/units/twr-plant-backup-fixture.css tests/fixtures/tailwind/consumer-preflight.css
	{
		cmp tmp/units/twr-plant-backup-guide.md guides/veneer.md && echo "restored guide byte-identical"
		cmp tmp/units/twr-plant-backup-fixture.css tests/fixtures/tailwind/consumer-preflight.css && echo "restored fixture byte-identical"
		git diff --stat > tmp/units/twr-plant-stat-after.txt
		cmp tmp/units/twr-plant-stat-before.txt tmp/units/twr-plant-stat-after.txt && echo "git diff --stat unchanged from before the plant"
		echo "loadavg=$(cat /proc/loadavg)"
	} >> "$log" 2>&1
done
