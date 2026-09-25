#!/usr/bin/env bash
# Runs TAILWIND-RECIPE round 2's acceptance gates in order, each logged to
# tmp/units/twr-2-<gate>.log.txt with the command it runs, its exit code, and the load average.
# Usage: bash tmp/units/twr-2-gates.sh [gate...]   (default: every gate)
cd /home/user/veneer-twr || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED=(
	tests/service/tailwind/consumer.test.ts
	tests/service/tailwind/profiles.test.ts
	tests/service/tailwind/preflight.test.ts
	tests/setupService.ts
	tests/setupService.test.ts
	tests/setupServer.ts
	tests/setupServer.test.ts
	tests/fixtures/tailwind/components.html
	tests/fixtures/tailwind/consumer-preflight.css
	guides/veneer.md
)
run() {
	local gate="$1"
	shift
	local log="tmp/units/twr-2-$gate.log.txt"
	{
		echo "+ $*"
		"$@"
		echo "exit=$?"
		echo "+ cat /proc/loadavg"
		cat /proc/loadavg
	} > "$log" 2>&1
	tail -3 "$log" | head -1
}
gates=("$@")
[ ${#gates[@]} -eq 0 ] && gates=(oxfmt-check check lint-check build-src test-service setup test-guides test-policy)
for gate in "${gates[@]}"; do
	case "$gate" in
		oxfmt-check) run "$gate" ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check "${OWNED[@]}" ;;
		check) run "$gate" npm run check ;;
		lint-check) run "$gate" npm run lint:check ;;
		build-src) run "$gate" npm run build:src ;;
		test-service) run "$gate" npm run test:service ;;
		setup) run "$gate" npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts ;;
		test-guides) run "$gate" npm run test:guides ;;
		test-policy) run "$gate" npm run test:policy ;;
		*) echo "unknown gate $gate" ;;
	esac
	echo "$gate done"
done
