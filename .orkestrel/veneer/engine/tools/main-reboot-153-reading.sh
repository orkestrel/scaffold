#!/usr/bin/env bash
# The styles session's REBOOT-153 request (2026-09-25): reads the four button-reboot styles files and button.test.ts on
# this Chromium 153 host, at Veneer main after REBOOT-153 (6586b11), through the styles config after the styles build.
# It runs in the main checkout, after the landing that holds it has exited. Usage: bash main-reboot-153-reading.sh
cd /c/Users/mikes/WebstormProjects/veneer || exit 1
OUT=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/main-reboot-153-reading.log.txt
{
	echo "# REBOOT-153 reading on the engine host (2026-09-25)"
	git log --oneline -1
	git merge-base --is-ancestor 6586b11 HEAD && echo "holds 6586b11: yes" || echo "holds 6586b11: NO"
	git status --short | head -5
	npm run build:src:styles > /dev/null 2>&1; echo "build:src:styles exit=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/carousel.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/elements/button.test.ts
	echo "exit=$?"
} > "$OUT" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$OUT" | grep -E "exit=|holds|Tests  |Test Files|FAIL |AssertionError|^[0-9a-f]{7,} |^ ?[MA?]{1,2} " | head -40
